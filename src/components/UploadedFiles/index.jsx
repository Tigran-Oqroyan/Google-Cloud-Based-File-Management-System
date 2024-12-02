import React from "react";
import FileCard from "../FIleCard";
import styles from './style.module.scss'

const UploadedFiles = () => {
  const files = [
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
    {
      name: "marry_christmas_happy_new_year.png",
    },
  ];
  
  return (
    <div className={styles.files_wrapper}>
      {files.map((file) => {
        return <FileCard file={file} />;
      })}
    </div>
  );
};

export default UploadedFiles;
