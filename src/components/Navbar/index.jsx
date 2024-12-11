import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { deleteFiles } from "../../slices/filesDeleteSlice";
import { clearFiles } from "../../slices/filesGetSlice";
import UploadFilesPopup from "../UploadFilesPoup";
import DeleteFilesPopup from "../DeleteFilesPopup";
import { clearUploadedFiles } from "../../slices/fileUploadSlice";

const Navbar = ({ isAllSelected, handleSelectAll }) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showDelPopup, setShowDelPopup] = useState(false);
  const files = useSelector((state) => state.filesGet.files);

  const deleteAll = () => {
    if (files.length > 0) {
      dispatch(deleteFiles());
      dispatch(clearFiles());
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

  const handleClose = () => {
    dispatch(clearUploadedFiles());
    setShowPopup(false);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>BoomUpload</div>

      <div className={styles.actions}>
        <div className={styles.deleteAll} onClick={() => setShowDelPopup(true)}>
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
        {showDelPopup && (
          <DeleteFilesPopup
            onClose={() => setShowDelPopup(false)}
            onDelete={() => deleteAll()}
            message="Are you sure you want to delete all your files?"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
