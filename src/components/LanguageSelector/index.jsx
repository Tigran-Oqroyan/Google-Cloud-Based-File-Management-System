import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../slices/languageSlice";
import styles from "./style.module.scss";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedLanguage = useSelector((state) => state.language);

  const languages = [
    { value: "en", label: "English" },
    { value: "am", label: "Հայերեն" },
    { value: "ru", label: "Русский" },
    { value: "ka", label: "ქართული" },
    { value: "uk", label: "Український" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "es", label: "Español" },
    { value: "pt", label: "Português" },
    { value: "it", label: "Italiano" },
    { value: "sv", label: "Svensk" },
  ];

  const handleLanguageChange = (language) => {
    dispatch(changeLanguage(language));
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.languages_wrapper}>
      <div
        className={styles.language_selector}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className={styles.selected_language}>
          {languages.find((lang) => lang.value === selectedLanguage)?.label}
        </span>
        <i className={`bx bx-chevron-${isDropdownOpen ? "up" : "down"}`}></i>
      </div>
      {isDropdownOpen && (
        <div className={styles.language_dropdown}>
          {languages.map((lang) => (
            <div
              key={lang.value}
              className={styles.language_option}
              onClick={() => handleLanguageChange(lang.value)}
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
