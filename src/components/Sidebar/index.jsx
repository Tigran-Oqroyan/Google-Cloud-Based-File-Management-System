import React from "react";
import { useDispatch } from "react-redux";
import styles from "./style.module.scss";
import { changeType } from "../../slices/fileTypeSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.sidebar}>
      <div
        className={styles.sidebar_item}
        onClick={() => dispatch(changeType("all"))}
      >
        All
      </div>
      <div
        className={styles.sidebar_item}
        onClick={() => dispatch(changeType("images"))}
      >
        Images
      </div>
      <div
        className={styles.sidebar_item}
        onClick={() => dispatch(changeType("videos"))}
      >
        Videos
      </div>
      <div
        className={styles.sidebar_item}
        onClick={() => dispatch(changeType("documents"))}
      >
        Documents
      </div>
      <div
        className={styles.sidebar_item}
        onClick={() => dispatch(changeType("presentations"))}
      >
        Presentations
      </div>
      <div
        className={styles.sidebar_item}
        onClick={() => dispatch(changeType("tables"))}
      >
        Tables
      </div>
      <div
        className={styles.sidebar_item}
        onClick={() => dispatch(changeType("pdf"))}
      >
        PDF
      </div>
      <div
        className={styles.sidebar_item}
        onClick={() => dispatch(changeType("csv"))}
      >
        CSV
      </div>
      <div
        className={styles.sidebar_item}
        onClick={() => dispatch(changeType("json"))}
      >
        JSON
      </div>
    </div>
  );
};

export default Sidebar;
