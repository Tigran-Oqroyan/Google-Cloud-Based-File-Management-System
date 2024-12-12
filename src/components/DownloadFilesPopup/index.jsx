import { useTranslation } from "../../hooks/useTranslation";
import styles from "./style.module.scss";

const DownloadFilesPopup = ({ onClose, onDownload, message }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.downloadHeader}>{t("Confirm Download")}</div>
        <div className={styles.downloadDescription}>{t(message)}</div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            {t("Cancel")}
          </button>
          <button className={styles.downloadButton} onClick={onDownload}>
            {t("Download")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadFilesPopup;
