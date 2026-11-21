
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  NotebookPen,
  Plus,
  Home,
  Star,
  Trash2,
  Tags,
  Folder,
  FolderPlus,
  Pencil,
  X,
  Check,
  LayoutDashboard,
  History,
  Database,
  CheckCircle2,
  Bell,
} from "lucide-react";

function Sidebar({
  onAddNote,
  activeView,
  onChangeView,
  availableTags = [],
  activeTag,
  onSelectTag,
  folders = [],
  activeFolderId,
  onCreateFolder,
  onSelectFolder,
  onRenameFolder,
  onDeleteFolder,
}) {
  const { t, i18n } = useTranslation();
  const isPersian = i18n.language === "fa";

  const [showFolderForm, setShowFolderForm] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderColor, setFolderColor] = useState("purple");

  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editingFolderName, setEditingFolderName] = useState("");

  const folderColors = [
    { name: "purple", color: "#B99AE8" },
    { name: "pink", color: "#EBAEC2" },
    { name: "blue", color: "#9CC9EB" },
    { name: "green", color: "#A8D7BB" },
    { name: "orange", color: "#F0C09C" },
    { name: "yellow", color: "#EED58C" },
  ];

  function handleCreateFolder(event) {
    event.preventDefault();

    const trimmedName = folderName.trim();

    if (!trimmedName) return;

    const alreadyExists = folders.some(
      (folder) =>
        folder.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      alert(t("sidebar.folderExists"));
      return;
    }

    onCreateFolder(trimmedName, folderColor);
    setFolderName("");
    setFolderColor("purple");
    setShowFolderForm(false);
  }

  function startRenameFolder(folder) {
    setEditingFolderId(folder.id);
    setEditingFolderName(folder.name);
  }

  function saveFolderName(folder) {
    const trimmedName = editingFolderName.trim();

    if (!trimmedName) {
      alert(t("sidebar.folderEmptyName"));
      return;
    }

    const alreadyExists = folders.some(
      (item) =>
        item.id !== folder.id &&
        item.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      alert(t("sidebar.folderExists"));
      return;
    }

    onRenameFolder(folder.id, trimmedName);
    setEditingFolderId(null);
    setEditingFolderName("");
  }

  function cancelRenameFolder() {
    setEditingFolderId(null);
    setEditingFolderName("");
  }

  function handleDeleteFolder(folder) {
    const confirmed = window.confirm(
      t("sidebar.deleteConfirm", { name: folder.name })
    );

    if (confirmed) {
      onDeleteFolder(folder.id);
    }
  }

  return (
    <aside className="sidebar">
      <div className="logo">
        <NotebookPen size={26} />
        <h2>Smart Notes</h2>
      </div>

      <button className="add-note-btn" onClick={onAddNote}>
        <Plus size={18} />
        {t("notes.newNote")}
      </button>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${
            activeView === "dashboard" ? "active" : ""
          }`}
          onClick={() => onChangeView("dashboard")}
        >
          <LayoutDashboard size={19} />
          {t("sidebar.dashboard")}
        </button>

        <button
          className={`nav-item ${
            activeView === "all" ? "active" : ""
          }`}
          onClick={() => onChangeView("all")}
        >
          <Home size={19} />
          {t("sidebar.allNotes")}
        </button>

        <button
          className={`nav-item ${
            activeView === "favorites" ? "active" : ""
          }`}
          onClick={() => onChangeView("favorites")}
        >
          <Star size={19} />
          {t("sidebar.favorites")}
        </button>

        <button
          className={`nav-item ${
            activeView === "completed" ? "active" : ""
          }`}
          onClick={() => onChangeView("completed")}
        >
          <CheckCircle2 size={19} />
          {isPersian ? "انجام‌شده‌ها" : "Completed Tasks"}
        </button>

        {/* Reminders */}
        <button
          className={`nav-item ${
            activeView === "reminders" ? "active" : ""
          }`}
          onClick={() => onChangeView("reminders")}
        >
          <Bell size={19} />
          {isPersian ? "یادآورها" : "Reminders"}
        </button>

        <button
          className={`nav-item ${
            activeView === "activity" ? "active" : ""
          }`}
          onClick={() => onChangeView("activity")}
        >
          <History size={19} />
          {isPersian ? "تاریخچه فعالیت‌ها" : "Activity History"}
        </button>

        <button
          className={`nav-item ${
            activeView === "trash" ? "active" : ""
          }`}
          onClick={() => onChangeView("trash")}
        >
          <Trash2 size={19} />
          {t("sidebar.trash")}
        </button>

        <button
          className={`nav-item ${
            activeView === "backup" ? "active" : ""
          }`}
          onClick={() => onChangeView("backup")}
        >
          <Database size={19} />
          {isPersian ? "پشتیبان‌گیری و خروجی" : "Backup & Export"}
        </button>
      </nav>

      <div className="sidebar-folders">
        <div className="sidebar-section-heading">
          <h3>
            <Folder size={16} />
            {t("sidebar.folders")}
          </h3>

          <button
            className="add-folder-icon"
            title={t("sidebar.createFolder")}
            onClick={() => setShowFolderForm(!showFolderForm)}
          >
            <FolderPlus size={18} />
          </button>
        </div>

        {showFolderForm && (
          <form
            className="folder-create-form"
            onSubmit={handleCreateFolder}
          >
            <input
              type="text"
              placeholder={t("sidebar.folderName")}
              value={folderName}
              onChange={(event) => setFolderName(event.target.value)}
              autoFocus
            />

            <div className="folder-color-options">
              {folderColors.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  title={item.name}
                  className={`folder-color-dot ${
                    folderColor === item.name ? "selected" : ""
                  }`}
                  style={{ backgroundColor: item.color }}
                  onClick={() => setFolderColor(item.name)}
                />
              ))}
            </div>

            <div className="folder-form-actions">
              <button type="submit" className="folder-save-btn">
                {t("sidebar.create")}
              </button>

              <button
                type="button"
                className="folder-cancel-btn"
                onClick={() => {
                  setShowFolderForm(false);
                  setFolderName("");
                }}
              >
                {t("sidebar.cancel")}
              </button>
            </div>
          </form>
        )}

        {folders.map((folder) => (
          <div
            key={folder.id}
            className={`sidebar-folder ${
              activeFolderId === folder.id ? "active" : ""
            }`}
          >
            {editingFolderId === folder.id ? (
              <form
                className="folder-inline-edit"
                onSubmit={(event) => {
                  event.preventDefault();
                  saveFolderName(folder);
                }}
              >
                <input
                  autoFocus
                  value={editingFolderName}
                  onChange={(event) =>
                    setEditingFolderName(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      cancelRenameFolder();
                    }
                  }}
                />

                <button type="submit" title={t("sidebar.saveName")}>
                  <Check size={15} />
                </button>

                <button
                  type="button"
                  title={t("sidebar.cancel")}
                  onClick={cancelRenameFolder}
                >
                  <X size={14} />
                </button>
              </form>
            ) : (
              <>
                <button
                  className="sidebar-folder-select"
                  onClick={() => onSelectFolder(folder.id)}
                >
                  <Folder
                    size={17}
                    style={{
                      color:
                        folderColors.find(
                          (item) => item.name === folder.color
                        )?.color || "#B99AE8",
                    }}
                  />
                  <span>{folder.name}</span>
                </button>

                <div className="sidebar-folder-actions">
                  <button
                    title={t("sidebar.renameFolder")}
                    onClick={() => startRenameFolder(folder)}
                  >
                    <Pencil size={13} />
                  </button>

                  <button
                    title={t("sidebar.deleteFolder")}
                    onClick={() => handleDeleteFolder(folder)}
                  >
                    <X size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {folders.length === 0 && !showFolderForm && (
          <p className="empty-folders">
            {t("sidebar.noFolders")}
          </p>
        )}
      </div>

      <div className="sidebar-tags">
        <h3>
          <Tags size={16} />
          {t("sidebar.tags")}
        </h3>

        {availableTags.map((tag) => (
          <button
            key={tag.name}
            className={`sidebar-tag ${
              activeTag === tag.name ? "active" : ""
            }`}
            onClick={() => onSelectTag(tag.name)}
          >
            <span className={`tag-dot dot-${tag.color}`} />
            {t(`tags.${tag.name}`)}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
