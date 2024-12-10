import styles from "./style.module.scss";

const DeleteFilesPopup = ({ onClose, onDelete, message}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.deleteHeader}>Confirm Delete</div>
        <div className={styles.deleteDescription}>{message}</div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFilesPopup;
