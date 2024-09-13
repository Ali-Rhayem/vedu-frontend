import { useState, useEffect, useRef } from "react";
import { LANGUAGE_VERSIONS } from "./constants";
import "./LanguageSelector.css";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("150px");
  const listRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (lang) => {
    onSelect(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    if (listRef.current) {
      setMaxWidth("150px");
    }
  }, [isOpen]);

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
            style={{ width: maxWidth }}
          >
            {languages.map(([lang, version]) => (
              <li
                key={lang}
                className={`menu-item ${lang === language ? "active" : ""}`}
                onClick={() => handleSelect(lang)}
                style={{ width: maxWidth }}
              >
                {lang}
                <span className="version"> ({version})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
