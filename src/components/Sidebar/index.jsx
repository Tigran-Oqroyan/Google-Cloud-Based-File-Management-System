import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { changeType } from "../../slices/fileTypeSlice";
import { deselectAllFiles } from "../../slices/selectedFilesSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.fileType.type);

  return (
    <div className={styles.sidebar}>
      <div
        className={`${styles.sidebar_item} ${
          type === "all" && styles.sidebar_item_active
        }`}
        onClick={() => {
          dispatch(changeType("all"));
          dispatch(deselectAllFiles());
        }}
      >
        All
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "images" && styles.sidebar_item_active
        }`}
        onClick={() => {
          dispatch(changeType("images"));
          dispatch(deselectAllFiles());
        }}
      >
        Images
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "videos" && styles.sidebar_item_active
        }`}
        onClick={() => {
          dispatch(changeType("videos"));
          dispatch(deselectAllFiles());
        }}
      >
        Videos
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "documents" && styles.sidebar_item_active
        }`}
        onClick={() => {
          dispatch(changeType("documents"));
          dispatch(deselectAllFiles());
        }}
      >
        Documents
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "presentations" && styles.sidebar_item_active
        }`}
        onClick={() => {
          dispatch(changeType("presentations"));
          dispatch(deselectAllFiles());
        }}
      >
        Presentations
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "tables" && styles.sidebar_item_active
        }`} 
        onClick={() => {
          dispatch(changeType("tables"));
          dispatch(deselectAllFiles());
        }}
      >
        Excel
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "pdf" && styles.sidebar_item_active
        }`}
        onClick={() => {
          dispatch(changeType("pdf"));
          dispatch(deselectAllFiles());
        }}
      >
        PDF
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "csv" && styles.sidebar_item_active
        }`}
        onClick={() => {
          dispatch(changeType("csv"));
          dispatch(deselectAllFiles());
        }}
      >
        CSV
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "json" && styles.sidebar_item_active
        }`}
        onClick={() => {
          dispatch(changeType("json"));
          dispatch(deselectAllFiles());
        }}
      >
        JSON
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "svg" && styles.sidebar_item_active
        }`}
        onClick={() => {
          dispatch(changeType("svg"));
          dispatch(deselectAllFiles());
        }}
      >
        SVG
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "exe" && styles.sidebar_item_active
        }`}
        onClick={() => {
          dispatch(changeType("exe"));
          dispatch(deselectAllFiles());
        }}
      >
        EXE
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "zip" && styles.sidebar_item_active
        }`}
        onClick={() => {
          dispatch(changeType("zip"));
          dispatch(deselectAllFiles());
        }}
      >
        ZIP
      </div>
    </div>
  );
};

export default Sidebar;
