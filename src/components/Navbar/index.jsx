import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { deleteFiles } from "../../slices/filesDeleteSlice";
import { clearFiles, deleteFilesById } from "../../slices/filesGetSlice";
import UploadFilesPopup from "../UploadFilesPoup";
import DeleteFilesPopup from "../DeleteFilesPopup";
import { clearUploadedFiles } from "../../slices/fileUploadSlice";
import { deleteFile } from "../../slices/fileDeleteSlice";

const Navbar = ({ isAllSelected, handleSelectAll }) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showDelPoup, setShowDelPopup] = useState(false);
  const [showDelAllPopup, setShowDelAllPopup] = useState(false);
  const files = useSelector((state) => state.filesGet.files);
  const selectedFiles = useSelector((state) => state.selectedFiles);

  const deleteAll = () => {
    if (files.length > 0) {
      dispatch(deleteFiles());
      dispatch(clearFiles());
      setShowDelAllPopup(false);
    }
  };

  const deleteSelected = () => {
    if (selectedFiles.length > 0) {
      dispatch(deleteFile(selectedFiles));
      dispatch(deleteFilesById(selectedFiles));
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
        <div
          className={styles.deleteAll}
          onClick={() => setShowDelAllPopup(true)}
        >
          Delete All
        </div>
        {selectedFiles.length > 0 && (
          <div
            className={styles.deleteAll}
            onClick={() => setShowDelPopup(true)}
          >
            Delete Selected
          </div>
        )}
        <div
          className={styles.downloadAll}
          onClick={() => {
            downloadAll(files);
          }}
        >
          Download All
        </div>
        {selectedFiles.length > 0 && (
          <div
            className={styles.downloadAll}
            onClick={() => {
              downloadSelected(files, selectedFiles);
            }}
          >
            Download Selected
          </div>
        )}
        <div
          className={`${styles.selectAll} ${
            isAllSelected && styles.allSelected
          }`}
          onClick={handleSelectAll}
        >
          {isAllSelected ? "Deselect All" : "Select All"}
        </div>

        <button
          className={styles.uploadButton}
          onClick={() => setShowPopup(true)}
        >
          Upload
        </button>
        {showPopup && <UploadFilesPopup onClose={() => handleClose()} />}
        {showDelAllPopup && (
          <DeleteFilesPopup
            onClose={() => setShowDelAllPopup(false)}
            onDelete={() => deleteAll()}
            message="Are you sure you want to delete all your files?"
          />
        )}
        {showDelPoup && (
          <DeleteFilesPopup
            onClose={() => setShowDelPopup(false)}
            onDelete={() => deleteSelected()}
            message="Are you sure you want to delete the selected files?"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
