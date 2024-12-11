import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FileCard from "../FIleCard";
import styles from "./style.module.scss";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { getFiles } from "../../slices/filesGetSlice";
import {
  selectFile,
  selectAllFiles,
  deselectAllFiles,
} from "../../slices/selectedFilesSlice";
import Loader from "../../IconComponents/Loader";
import Failed from "../../IconComponents/Failed";

const UploadedFiles = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.filesGet.files);
  const fileType = useSelector((state) => state.fileType.type);

  const filesGetLoading = useSelector((state) => state.filesGet.loading);
  const filesGetError = useSelector((state) => state.filesGet.error);

  const deleteFilesLoading = useSelector((state) => state.filesDelete.loading);
  const deleteFilesError = useSelector((state) => state.filesDelete.error);

  const deleteFileLoading = useSelector((state) => state.fileDelete.loading);
  const deleteFileError = useSelector((state) => state.fileDelete.error);

  const selectedFiles = useSelector((state) => state.selectedFiles);
  const isAllSelected =
    files.length > 0 && files.every((file) => selectedFiles.includes(file.id));

  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch]);

  const handleSelectAll = () => {
    if (isAllSelected) {
      dispatch(deselectAllFiles());
    } else {
      dispatch(selectAllFiles({ files, isSelected: true }));
    }
  };

  const handleCheckboxChange = (fileId, isSelected) => {
    dispatch(selectFile({ fileId, isSelected }));
  };

  const filteredFiles = React.useMemo(() => {
    const extensionMap = {
      all: null,
      images: ["jpg", "jpeg", "png", "jfif", "svg", "gif"],
      videos: ["mp4", "mov", "webm", "mkv"],
      documents: ["doc", "docx"],
      presentations: ["pptx", "pptm"],
      tables: ["xlsx", "xls"],
      pdf: ["pdf"],
      csv: ["csv"],
      json: ["json"],
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

  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch]);

  return (
    <>
      <Navbar isAllSelected={isAllSelected} handleSelectAll={handleSelectAll} />
      <div className={styles.sidebar_files_wrapper}>
        <Sidebar />
        {deleteFileLoading || filesGetLoading || deleteFilesLoading ? (
          <div className={styles.filesGetLoading}>
            <Loader />
          </div>
        ) : filteredFiles.length > 0 ? (
          <div className={styles.files_wrapper}>
            {filteredFiles.map((file) => {
              return (
                <FileCard
                  key={file.id}
                  file={file}
                  isSelected={selectedFiles.includes(file.id)}
                  onCheckboxChange={handleCheckboxChange}
                />
              );
            })}
          </div>
        ) : filesGetError ? (
          <div className={styles.filesGetError}>
            <Failed />
          </div>
        ) : (
          <div className={styles.noFilesWrapper}>
            <i class={`bx bx-file-find ${styles.bx_file_find}`}></i>
            There is no uploaded files to show
          </div>
        )}
      </div>
    </>
  );
};

export default UploadedFiles;
