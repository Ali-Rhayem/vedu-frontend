import { useState, useRef } from "react";
import { LANGUAGE_VERSIONS } from "./constants";
import "./LanguageSelector.css";

const languages = Object.keys(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (lang) => {
    onSelect(lang);
    setIsOpen(false);
  };

  return (
    <div className="language-selector-container">
      <p className="label">Language:</p>
      <div className="dropdown">
        <button className="menu-button" onClick={toggleDropdown}>
          {language}
        </button>
        {isOpen && (
          <ul
            className={`menu-list ${isOpen ? "open" : ""}`}
            ref={listRef}
          >
            {languages.map((lang) => (
              <li
                key={lang}
                className={`menu-item ${lang === language ? "active" : ""}`}
                onClick={() => handleSelect(lang)}
              >
                {lang}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
