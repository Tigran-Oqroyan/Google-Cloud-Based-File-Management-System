import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../slices/languageSlice";
import styles from "./style.module.scss";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedLanguage = useSelector((state) => state.language);
  const dropdownRef = useRef(null);

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
    { value: "ar", label: "العربية" },
    { value: "ja", label: "日本語" },
    { value: "zh", label: "中文" },
    { value: "ko", label: "한국어" },
    { value: "hi", label: "הינדי" },
    { value: "tr", label: "Türk" },
    { value: "pl", label: "Polskie" },
    { value: "nl", label: "Nederlandsk" },
  ];

  const handleLanguageChange = (language) => {
    dispatch(changeLanguage(language));
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.languages_wrapper} ref={dropdownRef}>
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
