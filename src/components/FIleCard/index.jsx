import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./style.module.scss";
import Loader from "../../IconComponents/Loader";
import { deleteFile } from "../../slices/fileDeleteSlice";
import { deleteFileById } from "../../slices/filesGetSlice";
import DeleteFilesPopup from "../DeleteFilesPopup";
import { useTranslation } from "../../hooks/useTranslation";

const ImageWithFallBack = ({ file, alt, LoadingComponent }) => {
  console.log("File", file);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const img = new Image();
    img.onload = () => setStatus("loaded");
    img.onerror = () => setStatus("error");
    img.src = file.mediaLink;
  }, [file.mediaLink]);

  if (status === "error") {
    const fileNameParts = file.name.split(".");
    const extension = fileNameParts[fileNameParts.length - 1];
    switch (extension) {
      case "doc":
      case "docs":
        return <i className={`bx bxs-file-doc ${styles.bxs_file_doc}`}></i>;
      case "txt":
        return <i className={`bx bxs-file-txt ${styles.bxs_file_txt}`}></i>;
      case "pdf":
        return <i className={`bx bxs-file-pdf ${styles.bxs_file_pdf}`}></i>;
      case "json":
        return <i className={`bx bxs-file-json ${styles.bxs_file_json}`}></i>;
      case "gif":
        return <i className={`bx bxs-file-gif ${styles.bxs_file_gif}`}></i>;
      case "zip":
        return (
          <i className={`bx bxs-file-archive ${styles.bxs_file_archive}`}></i>
        );
      default:
        return <i className={`bx bxs-file ${styles.bxs_file}`}></i>;
    }
  }

  if (status === "loading") {
    return <LoadingComponent />;
  }

  if (status === "loaded") {
    return <img src={file.mediaLink} alt={alt} />;
  }

  return null;
};

const FileCard = ({ file, isSelected, onCheckboxChange }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckboxChange = () => {
    const newSelectedState = !isSelected;
    onCheckboxChange(file.id, newSelectedState);
  };

  const handleShow = (file) => {
    const img = new Image();
    img.onload = () => {
      window.open(file.publicLink, "_blank");
    };
    img.onerror = () => {
      handleDownload(file);
    };
    img.src = file.publicLink;
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
    setShowPopup(false);
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
      <div
        className={`${styles.select_card_checkbox} ${
          isSelected && styles.selected
        }`}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
        <div className={styles.show_action} onClick={() => handleShow(file)}>
          <i class="bx bx-show"></i>
        </div>
        <div
          className={styles.download_action}
          onClick={() => handleDownload(file)}
        >
          <i class="bx bx-cloud-download"></i>
        </div>

        <div
          className={styles.delete_action}
          onClick={() => setShowPopup(true)}
        >
          <i class="bx bx-trash"></i>
        </div>
      </div>

      <div className={styles.image_wrapper}>
        <ImageWithFallBack
          file={file}
          alt={file.name}
          LoadingComponent={Loader}
        />
      </div>
      <div className={styles.card_description}>{getName(file.name)}</div>
      <div className={styles.file_size}>
        {convertSize(file.size)} {t("KB")}
      </div>
      {showPopup && (
        <DeleteFilesPopup
          onClose={() => setShowPopup(false)}
          onDelete={() => handleDelete(file.id)}
          message="Are you sure you want to delete this file ?"
        />
      )}
    </div>
  );
};

export default FileCard;
