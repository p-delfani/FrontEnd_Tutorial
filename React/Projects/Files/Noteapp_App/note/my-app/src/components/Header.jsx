
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Sun,
  Moon,
  Languages,
} from "lucide-react";

import { useTranslation } from "react-i18next";

function Header({
  onAddNote,
  searchTerm,
  onSearch,
  viewMode,
  onChangeViewMode,
  isDarkMode,
  onToggleTheme,
}) {
  const { t, i18n } = useTranslation();

  const isPersian = i18n.language === "fa";

  function toggleLanguage() {
    const newLanguage = isPersian ? "en" : "fa";

    i18n.changeLanguage(newLanguage);
    localStorage.setItem("smart-notes-language", newLanguage);
  }

  return (
    <header className="header">
      <div>
        <h1>{t("workspace")}</h1>
        <p>{t("subtitle")}</p>
      </div>

      <div className="header-actions">
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </button>

        <button
          className="language-toggle"
          onClick={toggleLanguage}
          title={isPersian ? "Switch to English" : "تغییر به فارسی"}
        >
          <Languages size={18} />
          {isPersian ? "EN" : "FA"}
        </button>

        <div className="view-toggle">
          <button
            className={viewMode === "grid" ? "view-btn active" : "view-btn"}
            onClick={() => onChangeViewMode("grid")}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>

          <button
            className={viewMode === "list" ? "view-btn active" : "view-btn"}
            onClick={() => onChangeViewMode("list")}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>

        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder={t("notes.search")}
            value={searchTerm}
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>

        <button className="header-add-btn" onClick={onAddNote}>
          <Plus size={18} />
          {t("notes.newNote")}
        </button>
      </div>
    </header>
  );
}

export default Header;
