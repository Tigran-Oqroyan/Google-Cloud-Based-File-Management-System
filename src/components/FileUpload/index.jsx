import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFiles } from "../../slices/fileUploadSlice";
import { uploadFile } from "../../slices/fileUploadSlice";
import styles from "./style.module.scss";

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
            <p>Drag and Drop / Click to upload files</p>
            <i class={`bx bx-cloud-upload ${styles.bx_cloud_upload}`}></i>{" "}
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className={styles.fileInput}
            />
          </div>
        </div>

        <div className={styles.uploadedFiles}>
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
                    {fileWrapper.status === "pending" && "Pending"}
                    {fileWrapper.status === "succeeded" && "Succeeded"}
                    {fileWrapper.status === "failed" && "Failed"}
                  </span>
                  {fileWrapper.error && (
                    <span className={styles.fileError}>
                      Error: {fileWrapper.error}
                    </span>
                  )}
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
