import styles from "./style.module.scss";

const Left = ({ handlePrev }) => {
  return (
    <i
      onClick={() => handlePrev()}
      class={`bx bx-chevron-left ${styles.slidePrev}`}
    ></i>
  );
};

export default Left;
