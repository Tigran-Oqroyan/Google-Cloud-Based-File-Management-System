import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { deleteFilesById } from "../../slices/filesGetSlice";
import UploadFilesPopup from "../UploadFilesPoup";
import DeleteFilesPopup from "../DeleteFilesPopup";
import { clearUploadedFiles } from "../../slices/fileUploadSlice";
import { deleteFile } from "../../slices/fileDeleteSlice";
import { deselectAllFiles } from "../../slices/selectedFilesSlice";
import { useTranslation } from "../../hooks/useTranslation";
import LanguageSelector from "../LanguageSelector";
import DownloadFilesPopup from "../DownloadFilesPopup";

const Navbar = ({ isAllSelected, handleSelectAll }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showDelPoup, setShowDelPopup] = useState(false);
  const [showDelAllPopup, setShowDelAllPopup] = useState(false);
  const [showDownloadPopup, setDownloadPopup] = useState(false);
  const [showDownloadAllPopup, setDownloadAllPopup] = useState(false);
  const files = useSelector((state) => state.filesGet.files);
  const fileType = useSelector((state) => state.fileType.type);
  const selectedFiles = useSelector((state) => state.selectedFiles);

  const filteredFiles = React.useMemo(() => {
    const extensionMap = {
      all: null,
      images: ["jpg", "jpeg", "png", "jfif"],
      videos: ["mp4", "mov", "webm", "mkv"],
      documents: ["doc", "docx", "txt"],
      presentations: ["pptx", "pptm"],
      tables: ["xlsx", "xls"],
      pdf: ["pdf"],
      csv: ["csv"],
      json: ["json"],
      exe: ["exe"],
      svg: ["svg"],
      zip: ["zip"],
      gif: ["gif"],
    };

    if (fileType === "all") {
      return files;
    }

    const allowedExtensions = extensionMap[fileType];
    if (!allowedExtensions) {
      return [];
    }

    return files.filter((file) => {
      const fileParts = file?.name?.split(".");
      const type = fileParts?.[fileParts.length - 1]?.toLowerCase();
      return allowedExtensions.includes(type);
    });
  }, [files, fileType]);

  const deleteAll = () => {
    if (filteredFiles.length > 0) {
      const ids = filteredFiles.map((file) => {
        return file.id;
      });
      dispatch(deleteFile(ids));
      dispatch(deleteFilesById(ids));
      dispatch(deselectAllFiles());
      setShowDelAllPopup(false);
    }
  };

  const deleteSelected = () => {
    if (selectedFiles.length > 0) {
      dispatch(deleteFile(selectedFiles));
      dispatch(deleteFilesById(selectedFiles));
      dispatch(deselectAllFiles());
      setShowDelPopup(false);
    }
  };

  const downloadAll = async (files) => {
    if (files.length > 0) {
      files.forEach((file, index) => {
        setTimeout(() => {
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = file.mediaLink;
          document.body.appendChild(iframe);
          setTimeout(() => document.body.removeChild(iframe), 5000);
        }, index * 200);
      });
      setDownloadAllPopup(false);
    }
  };

  const downloadSelected = async (files, selectedFiles) => {
    if (files.length > 0 && selectedFiles.length > 0) {
      files.forEach((file, index) => {
        if (selectedFiles.includes(file.id)) {
          setTimeout(() => {
            const iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = file.mediaLink;
            document.body.appendChild(iframe);
            setTimeout(() => document.body.removeChild(iframe), 5000);
          }, index * 200);
        }
      });
      setDownloadPopup(false);
    }
  };

  const handleClose = () => {
    dispatch(clearUploadedFiles());
    setShowPopup(false);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>BoomUpload</div>

      <div className={styles.actions}>
        {filteredFiles.length > 0 && (
          <div
            className={styles.deleteAll}
            onClick={() => setShowDelAllPopup(true)}
          >
            {t("Delete All")}
          </div>
        )}
        {filteredFiles.length > 0 && selectedFiles.length > 0 && (
          <div
            className={styles.deleteAll}
            onClick={() => setShowDelPopup(true)}
          >
            {t("Delete")}
          </div>
        )}
        {filteredFiles.length > 0 && (
          <div
            className={styles.downloadAll}
            onClick={() => {
              setDownloadAllPopup(true);
            }}
          >
            {t("Download All")}
          </div>
        )}
        {filteredFiles.length > 0 && selectedFiles.length > 0 && (
          <div
            className={styles.downloadAll}
            onClick={() => {
              setDownloadPopup(true);
            }}
          >
            {t("Download")}
          </div>
        )}
        {filteredFiles.length > 0 && (
          <div
            className={`${styles.selectAll} ${
              isAllSelected && styles.allSelected
            }`}
            onClick={handleSelectAll}
          >
            {isAllSelected ? t("Deselect All") : t("Select All")}
          </div>
        )}
        <button
          className={styles.uploadButton}
          onClick={() => {
            setShowPopup(true);
            dispatch(deselectAllFiles());
          }}
        >
          {t("Upload")}
        </button>
        <LanguageSelector />
        {showPopup && <UploadFilesPopup onClose={() => handleClose()} />}
        {showDelAllPopup && (
          <DeleteFilesPopup
            onClose={() => setShowDelAllPopup(false)}
            onDelete={() => deleteAll()}
            message="Are you sure you want to delete all your files ?"
          />
        )}
        {showDelPoup && (
          <DeleteFilesPopup
            onClose={() => setShowDelPopup(false)}
            onDelete={() => deleteSelected()}
            message="Are you sure you want to delete the selected files ?"
          />
        )}
        {showDownloadPopup && (
          <DownloadFilesPopup
            onClose={() => setDownloadPopup(false)}
            onDownload={() => downloadSelected(filteredFiles, selectedFiles)}
            message="Are you sure you want to download the selected files ?"
          />
        )}
        {showDownloadAllPopup && (
          <DownloadFilesPopup
            onClose={() => setDownloadAllPopup(false)}
            onDownload={() => downloadAll(filteredFiles)}
            message="Are you sure you want to download all your files ?"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
