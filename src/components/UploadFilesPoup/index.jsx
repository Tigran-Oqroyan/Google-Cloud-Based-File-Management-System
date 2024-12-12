import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFiles } from "../../slices/fileUploadSlice";
import { uploadFile } from "../../slices/fileUploadSlice";
import styles from "./style.module.scss";
import Loader from "../../IconComponents/Loader";
import Failed from "../../IconComponents/Failed";
import Successed from "../../IconComponents/Successed";
import Left from "../../IconComponents/Left";
import Right from "../../IconComponents/Right";
import { useTranslation } from "../../hooks/useTranslation";

const UploadFilesPopup = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const files = useSelector((state) => state.fileUpload.files);

  const images = files.filter((file) => {
    return file.fileMetadata.type.slice(0, 5) === "image";
  });

  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);

    dispatch(addFiles(fileArray));

    // Trigger upload for each file
    fileArray.forEach((file) => {
      dispatch(uploadFile(file));
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleFileChange = (event) => {
    handleFiles(event.target.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handlePrev = () => {
    setCurrentImage((prev) => {
      if (prev === 0) {
        return images.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  const handleNext = () => {
    setCurrentImage((prev) => {
      if (prev === images.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.uploadWrapper}>
          <div className={styles.dropAndClickWrapper}>
            <div
              className={styles.dropAndClickArea}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <i class={`bx bx-cloud-upload ${styles.bx_cloud_upload}`}></i>{" "}
              <span>{t("Choose a file or drag and drop it here")}</span>
              <label
                htmlFor="file-upload"
                className={styles.custom_file_upload_button}
              >
                {t("Browse File")}
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div
            className={`${styles.uploadedFiles} ${
              files.length > 0 && styles.uploadedFilesScrollable
            }`}
          >
            {files.length <= 0 && (
              <div className={styles.noUploadedFiles}>
                {" "}
                <div className={styles.noUploadedFilesInner}>
                  <i class={`bx bx-file-find ${styles.bx_file_find}`}></i>
                  {t("There is no uploaded files")}
                </div>{" "}
              </div>
            )}
            {files.map((fileWrapper, index) => (
              <div key={index} className={styles.fileItem}>
                <img
                  src={fileWrapper?.data?.links?.publicLink}
                  className={styles.fileImage}
                  alt=""
                />
                <span className={styles.fileStatus}>
                  {fileWrapper.status === "pending" && <Loader />}
                  {fileWrapper.status === "succeeded" && <Successed />}
                  {fileWrapper.status === "failed" && <Failed />}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.showSliderWrapper}>
          <div
            className={`${
              images.length <= 0
                ? styles.noContentShowSlider
                : styles.showSlider
            }`}
          >
            {images.length <= 0 ? (
              <div className={styles.noUploadedFilesToShow}>
                <i class={`bx bx-file-find ${styles.bx_file_find}`}></i>
                <div>{t("There is no uploaded files to show")}</div>
              </div>
            ) : (
              <img
                className={styles.sliderImage}
                src={images[currentImage]?.data?.links?.publicLink}
                alt=""
              />
            )}
            {images.length > 1 && (
              <div>
                <Left handlePrev={handlePrev} />
                <Right handleNext={handleNext} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFilesPopup;
