import React from "react";
import styles from "./style.module.scss";

const FileCard = ({ file }) => {

  const handleShow = () => {

  }

  const handleDownload = () => {

  }

  const handleDelete = () => {

  }

  return (
    <div className={styles.card_wrapper}>
      <div className={styles.image_wrapper}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmpXqxaJtTRQZHpujEd7U5E_16XgKKt8gSg&s" />
      </div>
      <div className={styles.card_description}>{file.name}</div>
      <div className={styles.file_size}>34.6KB</div>

      <div className={styles.actions}>
        <div className={styles.show_action}>
          <i class="bx bx-show"></i>
        </div>
        <div className={styles.line}></div>
        <div className={styles.download_action}>
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
