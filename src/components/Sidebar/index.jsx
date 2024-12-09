import React from 'react'
import styles from './style.module.scss';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_item}>All</div>
      <div className={styles.sidebar_item}>Images</div>
      <div className={styles.sidebar_item}>Videos</div>
      <div className={styles.sidebar_item}>Documents</div>
      <div className={styles.sidebar_item}>Presentations</div>
      <div className={styles.sidebar_item}>Tables</div>
      <div className={styles.sidebar_item}>PDF</div>
      <div className={styles.sidebar_item}>CSV</div>
      <div className={styles.sidebar_item}>JSON</div>
    </div>
  )
}

export default Sidebar
