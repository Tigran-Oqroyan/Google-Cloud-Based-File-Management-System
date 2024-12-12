import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { changeType } from "../../slices/fileTypeSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.fileType.type);
  console.log("TTTT", type);

  return (
    <div className={styles.sidebar}>
      <div
        className={`${styles.sidebar_item} ${
          type === "all" && styles.sidebar_item_active
        }`}
        onClick={() => dispatch(changeType("all"))}
      >
        All
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "images" && styles.sidebar_item_active
        }`}
        onClick={() => dispatch(changeType("images"))}
      >
        Images
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "videos" && styles.sidebar_item_active
        }`}
        onClick={() => dispatch(changeType("videos"))}
      >
        Videos
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "documents" && styles.sidebar_item_active
        }`}
        onClick={() => dispatch(changeType("documents"))}
      >
        Documents
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "presentations" && styles.sidebar_item_active
        }`}
        onClick={() => dispatch(changeType("presentations"))}
      >
        Presentations
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "tables" && styles.sidebar_item_active
        }`}
        onClick={() => dispatch(changeType("tables"))}
      >
        Tables
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "pdf" && styles.sidebar_item_active
        }`}
        onClick={() => dispatch(changeType("pdf"))}
      >
        PDF
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "csv" && styles.sidebar_item_active
        }`}
        onClick={() => dispatch(changeType("csv"))}
      >
        CSV
      </div>
      <div
        className={`${styles.sidebar_item} ${
          type === "json" && styles.sidebar_item_active
        }`}
        onClick={() => dispatch(changeType("json"))}
      >
        JSON
      </div>
    </div>
  );
};

export default Sidebar;
