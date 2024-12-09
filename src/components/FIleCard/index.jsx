import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Failed from "../../IconComponents/Failed";
import Loader from "../../IconComponents/Loader";

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
  const handleShow = () => {};

  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file.mediaLink;
    link.download = file.name || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = () => {};

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
        <div className={styles.show_action}>
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

        <div className={styles.delete_action}>
          <i class="bx bx-trash"></i>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
