import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { deleteFiles } from "../../slices/filesDeleteSlice";
import { clearFiles } from "../../slices/filesGetSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.filesGet.files);

  const deleteAll = () => {
    dispatch(deleteFiles());
    dispatch(clearFiles());
  };

  const downloadAll = async (files) => {
    files.forEach((file, index) => {
      setTimeout(() => {
        const iframe = document.createElement("iframe");
        iframe.style.display = 'none';
        iframe.src = file.mediaLink;
        document.body.appendChild(iframe);
        setTimeout(() => document.body.removeChild(iframe), 5000);
      }, index * 200);
    });
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>BoomUpload</div>

      <div className={styles.actions}>
        <div
          className={styles.deleteAll}
          onClick={() => {
            deleteAll();
          }}
        >
          Delete All
        </div>
        <div
          className={styles.downloadAll}
          onClick={() => {
            downloadAll(files);
          }}
        >
          Download All
        </div>
        <div className={styles.selectAll}>Select All</div>

        <Link className={styles.uploadButton} to="/upload">
          Upload
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
