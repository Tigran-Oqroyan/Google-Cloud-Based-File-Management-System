import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./style.module.scss";
import Failed from "../../IconComponents/Failed";
import Loader from "../../IconComponents/Loader";
import { deleteFile } from "../../slices/fileDeleteSlice";
import { deleteFileById } from "../../slices/filesGetSlice";

const ImageWithFallBack = ({ src, alt, LoadingComponent, FailedComponent }) => {
  const [status, setStatus] = useState("loading"); // Possible states: 'loading', 'loaded', 'error'

  useEffect(() => {
    const img = new Image();
    img.onload = () => setStatus("loaded");
    img.onerror = () => setStatus("error");
    img.src = src;
  }, [src]);

  if (status === "error") {
    return <FailedComponent />;
  }

  if (status === "loading") {
    return <LoadingComponent />;
  }

  if (status === "loaded") {
    return <img src={src} alt={alt} />;
  }

  return null;
};

const FileCard = ({ file }) => {
  const dispatch = useDispatch();

  const handleShow = (file) => {
    if (file && file.publicLink) {
      try {
        window.open(file.publicLink, "_blank");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn("Invalid file or missing publicLink");
    }
  };

  const handleDownload = (file) => {
    setTimeout(() => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = file.mediaLink;
      document.body.appendChild(iframe);
      setTimeout(() => document.body.removeChild(iframe), 1000);
    }, 200);
  };

  const handleDelete = (id) => {
    dispatch(deleteFile([id]));
    dispatch(deleteFileById(id));
  };

  const convertSize = (size) => {
    const wholePart = size / 1000;
    const decimalPart = size % 1000;
    const sizeInKB = wholePart + "" + decimalPart;
    return sizeInKB;
  };

  const getName = (name) => {
    const nameArr = name.split("/");
    return nameArr[nameArr.length - 1];
  };

  return (
    <div className={styles.card_wrapper}>
      <div className={styles.image_wrapper}>
        <ImageWithFallBack
          src={file.publicLink}
          alt={file.name}
          LoadingComponent={Loader}
          FailedComponent={Failed}
        />
      </div>
      <div className={styles.card_description}>{getName(file.name)}</div>
      <div className={styles.file_size}>{convertSize(file.size)} KB</div>

      <div className={styles.actions}>
        <div className={styles.show_action} onClick={() => handleShow(file)}>
          <i class="bx bx-show"></i>
        </div>
        <div className={styles.line}></div>
        <div
          className={styles.download_action}
          onClick={() => handleDownload(file)}
        >
          <i class="bx bx-cloud-download"></i>
        </div>
        <div className={styles.line}></div>

        <div
          className={styles.delete_action}
          onClick={() => handleDelete(file.id)}
        >
          <i class="bx bx-trash"></i>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
