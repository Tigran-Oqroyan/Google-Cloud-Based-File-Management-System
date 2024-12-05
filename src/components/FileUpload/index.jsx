import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFiles } from "../../slices/fileUploadSlice";
import { uploadFile } from "../../slices/fileUploadSlice";
import styles from "./style.module.scss";
import Loader from "../../IconComponents/Loader";
import Failed from "../../IconComponents/Failed";
import Successed from "../../IconComponents/Successed";

const FileUpload = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.fileUpload.files);

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

  return (
    <div className={styles.uploadFlowWrapper}>
      <div className={styles.uploadAndShowWrapper}>
        <div className={styles.dropAndClickWrapper}>
          <div
            className={styles.dropAndClickArea}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <i class={`bx bx-cloud-upload ${styles.bx_cloud_upload}`}></i>{" "}
            <span>Choose a file or drag & drop it here</span>
            <span>JPG, JPEG, PNG</span>
            <label
              htmlFor="file-upload"
              className={styles.custom_file_upload_button}
            >
              Browse File
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
                There is no uploaded files yet ...
              </div>{" "}
            </div>
          )}
          {files.map(
            (fileWrapper, index) => (
              console.log(fileWrapper),
              (
                <div key={index} className={styles.fileItem}>
                  <img
                    src={fileWrapper?.data?.links?.publicLink}
                    className={styles.fileImage}
                  />
                  <span className={styles.fileStatus}>
                    {fileWrapper.status === "pending" && <Loader />}
                    {fileWrapper.status === "succeeded" && <Successed />}
                    {fileWrapper.status === "failed" && <Failed />}
                  </span>
                </div>
              )
            )
          )}
        </div>
      </div>

      <div className={styles.showSlider}></div>
    </div>
  );
};

export default FileUpload;
