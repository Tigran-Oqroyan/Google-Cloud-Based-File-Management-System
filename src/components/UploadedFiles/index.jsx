import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FileCard from "../FIleCard";
import styles from "./style.module.scss";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { getFiles } from "../../slices/filesGetSlice";
import Loader from "../../IconComponents/Loader";
import Failed from "../../IconComponents/Failed";

const UploadedFiles = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.filesGet.files);
  const filesGetLoading = useSelector((state) => state.filesGet.loading);
  const filesGetError = useSelector((state) => state.filesGet.error);

  const deleteFilesLoading = useSelector((state) => state.filesDelete.loading);
  const deleteFilesError = useSelector((state) => state.filesDelete.error);

  const deleteFileLoading = useSelector((state) => state.fileDelete.loading);
  const deleteFileError = useSelector((state) => state.fileDelete.error);

  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className={styles.sidebar_files_wrapper}>
        <Sidebar />
        {deleteFileLoading || filesGetLoading || deleteFilesLoading ? (
          <div className={styles.filesGetLoading}>
            <Loader />
          </div>
        ) : files.length > 0 ? (
          <div className={styles.files_wrapper}>
            {files.map((file) => {
              return <FileCard key={file.id} file={file} />;
            })}
          </div>
        ) : filesGetError ? (
          <div className={styles.filesGetError}>
            <Failed />
          </div>
        ) : (
          <div className={styles.noFilesWrapper}>
            There are no files to show
          </div>
        )}
      </div>
    </>
  );
};

export default UploadedFiles;
