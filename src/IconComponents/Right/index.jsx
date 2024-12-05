import styles from "./style.module.scss";

const Right = ({ handleNext }) => {
  return (
    <i
      onClick={handleNext}
      class={`bx bx-chevron-right ${styles.slideNext}`}
    ></i>
  );
};

export default Right;
