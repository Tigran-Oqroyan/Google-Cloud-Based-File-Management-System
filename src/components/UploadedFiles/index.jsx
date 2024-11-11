import React from "react";
import FileCard from "../FIleCard";
import styles from './style.module.scss'

const UploadedFiles = ({ files }) => {
  return (
    <div className={styles.files_wrapper}>
      {files.map((file) => {
        return <FileCard file={file} />;
      })}
    </div>
  );
};

export default UploadedFiles;
