import { useState, useEffect, useRef } from "react";
import { LANGUAGE_VERSIONS } from "./constants";
import "./LanguageSelector.css";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("auto"); // To store the max width
  const listRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (lang) => {
    onSelect(lang);
    setIsOpen(false);
  };

  // Calculate the maximum width of the menu items once on mount
  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.children;
      let max = 0;
      for (let item of items) {
        const itemWidth = item.offsetWidth;
        if (itemWidth > max) {
          max = itemWidth;
        }
      }
      setMaxWidth(`${max}px`);
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
