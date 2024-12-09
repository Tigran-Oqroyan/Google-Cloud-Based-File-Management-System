import React from "react";
import { useDispatch } from "react-redux";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { deleteFiles } from "../../slices/filesDelete";
import { getFiles } from "../../slices/filesGetSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const deleteAll = () => {
    dispatch(deleteFiles());
    dispatch(getFiles());
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
        <div className={styles.downloadAll}>Download All</div>
        <div className={styles.selectAll}>Select All</div>

        <Link className={styles.uploadButton} to="/upload">
          Upload
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
