import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FileCard from "../FIleCard";
import styles from "./style.module.scss";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { getFiles } from "../../slices/filesGetSlice";

const UploadedFiles = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.filesGet.files);
  console.log(files);

  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className={styles.sidebar_files_wrapper}>
        <Sidebar />
        {files.length > 0 ? (
          <div className={styles.files_wrapper}>
            {files.map((file) => {
              return <FileCard key={file.id} file={file} />;
            })}
          </div>
        ) : (
          <div className={styles.noFilesWrapper}>There are no files...</div>
        )}
      </div>
    </>
  );
};

export default UploadedFiles;
