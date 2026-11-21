
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  FileText,
  Trash2,
  RotateCcw,
  X,
  Star,
  Pin,
  FolderInput,
  Folder,
  Check,
  Circle,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  Copy,
} from "lucide-react";

function NotesList({
  notes,
  selectedNoteId,
  onSelectNote,
  activeView,
  activeTag,
  viewMode,
  onMoveToTrash,
  onRestore,
  onDeletePermanently,
  onToggleFavorite,
  onToggleComplete,
  onDuplicate,
  folders = [],
  onMoveToFolder,
  unlockedNoteIds = [],
}) {
  const { t, i18n } = useTranslation();
  const isPersian = i18n.language === "fa";

  const [openFolderMenu, setOpenFolderMenu] = useState(null);

  const tagColors = {
    Work: "blue",
    Personal: "purple",
    Ideas: "yellow",
    Finance: "green",
    Health: "pink",
  };

  function handleMoveToFolder(event, noteId, folderId) {
    event.stopPropagation();
    onMoveToFolder?.(noteId, folderId);
    setOpenFolderMenu(null);
  }

  function formatDate(date) {
    if (!date) return t("notes.recently");

    return new Date(date).toLocaleDateString(
      isPersian ? "fa-IR" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  }

  function formatCompletionDate(date) {
    if (!date) return "";

    return new Intl.DateTimeFormat(
      isPersian ? "fa-IR" : "en-US",
      {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(new Date(date));
  }

  function renderNoteCard(note) {
    const currentFolder = folders.find(
      (folder) => folder.id === note.folderId
    );

    const isCompleted = Boolean(note.isCompleted);
    const isInTrash = activeView === "trash";
    const isPrivate = Boolean(note.isPrivate);

    const isUnlocked =
      isPrivate &&
      unlockedNoteIds.some(
        (id) => String(id) === String(note.id)
      );

    const privateTitle = isPersian
      ? "یادداشت خصوصی"
      : "Private note";

    const privateContent = isPersian
      ? "این یادداشت با رمز عبور محافظت شده است."
      : "This note is password protected.";

    return (
      <article
        key={note.id}
        className={`note-card note-color-${note.color || "purple"} ${
          String(selectedNoteId) === String(note.id) ? "selected" : ""
        } ${isCompleted ? "completed-note-card" : ""}`}
        onClick={() => onSelectNote(note.id)}
      >
        <div className="note-card-top">
          <div className="note-card-icon">
            {isPrivate ? (
              <LockKeyhole size={17} />
            ) : (
              <FileText size={17} />
            )}
          </div>

          <div className="note-card-actions">
            {isInTrash ? (
              <>
                <button
                  type="button"
                  className="note-action-button restore-action"
                  title={t("notes.restore")}
                  aria-label={t("notes.restore")}
                  onClick={(event) => {
                    event.stopPropagation();
                    onRestore(note.id);
                  }}
                >
                  <RotateCcw size={17} />
                </button>

                <button
                  type="button"
                  className="note-action-button delete-action"
                  title={t("notes.deletePermanently")}
                  aria-label={t("notes.deletePermanently")}
                  onClick={(event) => {
                    event.stopPropagation();

                    if (window.confirm(t("notes.confirmDelete"))) {
                      onDeletePermanently(note.id);
                    }
                  }}
                >
                  <X size={17} />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={`note-action-button complete-action ${
                    isCompleted ? "is-completed" : ""
                  }`}
                  title={
                    isCompleted
                      ? isPersian
                        ? "بازگرداندن به یادداشت‌های فعال"
                        : "Move back to active notes"
                      : isPersian
                        ? "انتقال یادداشت به فهرست انجام‌شده‌ها"
                        : "Move note to completed tasks"
                  }
                  aria-label={
                    isCompleted
                      ? isPersian
                        ? "بازگردانی یادداشت"
                        : "Restore note"
                      : isPersian
                        ? "انتقال به انجام‌شده‌ها"
                        : "Mark as done"
                  }
                  aria-pressed={isCompleted}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleComplete?.(note.id);
                  }}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 size={15} />
                      <span>
                        {isPersian ? "انجام شده" : "Completed"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Circle size={15} />
                      <span>
                        {isPersian ? "انجام نشده" : "Not done"}
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className={`note-action-button favorite-action ${
                    note.isFavorite ? "is-favorite" : ""
                  }`}
                  title={t("notes.favorite")}
                  aria-label={t("notes.favorite")}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleFavorite(note.id);
                  }}
                >
                  {note.isFavorite ? (
                    <Pin size={17} fill="currentColor" />
                  ) : (
                    <Star size={17} />
                  )}
                </button>

                {/* Duplicate Note */}
                <button
                  type="button"
                  className="note-action-button"
                  title={
                    isPrivate && !isUnlocked
                      ? isPersian
                        ? "ابتدا یادداشت خصوصی را باز کن"
                        : "Unlock this private note first"
                      : isPersian
                        ? "کپی یادداشت"
                        : "Duplicate note"
                  }
                  aria-label={
                    isPersian ? "کپی یادداشت" : "Duplicate note"
                  }
                  disabled={isPrivate && !isUnlocked}
                  onClick={(event) => {
                    event.stopPropagation();
                    onDuplicate?.(note.id);
                  }}
                >
                  <Copy size={17} />
                </button>

                <div className="folder-menu-wrapper">
                  <button
                    type="button"
                    className="note-action-button folder-action"
                    title={t("notes.moveToFolder")}
                    aria-label={t("notes.moveToFolder")}
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpenFolderMenu(
                        openFolderMenu === note.id ? null : note.id
                      );
                    }}
                  >
                    <FolderInput size={17} />
                  </button>

                  {openFolderMenu === note.id && (
                    <div
                      className="folder-dropdown"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <p className="folder-dropdown-title">
                        {t("notes.moveToFolder")}
                      </p>

                      <button
                        type="button"
                        className="folder-option"
                        onClick={(event) =>
                          handleMoveToFolder(event, note.id, null)
                        }
                      >
                        <Folder size={15} />
                        <span>{t("notes.noFolder")}</span>
                        {!note.folderId && <Check size={14} />}
                      </button>

                      {folders.map((folder) => (
                        <button
                          type="button"
                          key={folder.id}
                          className="folder-option"
                          onClick={(event) =>
                            handleMoveToFolder(
                              event,
                              note.id,
                              folder.id
                            )
                          }
                        >
                          <Folder
                            size={15}
                            style={{ color: folder.color }}
                          />

                          <span>{folder.name}</span>

                          {note.folderId === folder.id && (
                            <Check size={14} />
                          )}
                        </button>
                      ))}

                      {folders.length === 0 && (
                        <p className="folder-dropdown-empty">
                          {t("notes.noFoldersCreated")}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="note-action-button delete-action"
                  title={t("notes.delete")}
                  aria-label={t("notes.delete")}
                  onClick={(event) => {
                    event.stopPropagation();
                    onMoveToTrash(note.id);
                  }}
                >
                  <Trash2 size={17} />
                </button>
              </>
            )}
          </div>
        </div>

        <h3
          className="note-card-title"
          style={
            isCompleted
              ? {
                  textDecoration: "line-through",
                  opacity: 0.65,
                }
              : {}
          }
        >
          {isPrivate && !isUnlocked
            ? privateTitle
            : note.title || t("notes.untitled")}
        </h3>

        <p className="note-card-date">
          {t("notes.lastEdited")} {formatDate(note.updatedAt)}
        </p>

        <p className="note-card-content">
          {isPrivate && !isUnlocked
            ? privateContent
            : note.content || t("notes.noContent")}
        </p>

        {isPrivate && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "10px",
              fontSize: "11px",
              color: "#8b7bea",
              fontWeight: 700,
            }}
          >
            <LockKeyhole size={13} />
            {isUnlocked
              ? isPersian
                ? "باز شده"
                : "Unlocked"
              : isPersian
                ? "قفل شده"
                : "Locked"}
          </div>
        )}

        {isCompleted && (
          <div className="note-completion-info">
            <CheckCircle2 size={15} />
            <span>
              {isPersian ? "تکمیل‌شده" : "Completed"}
            </span>

            {note.completedAt && (
              <>
                <Clock3 size={13} />
                <span>{formatCompletionDate(note.completedAt)}</span>
              </>
            )}
          </div>
        )}

        {currentFolder && (
          <div className="note-folder-label">
            <Folder
              size={13}
              style={{ color: currentFolder.color }}
            />
            {currentFolder.name}
          </div>
        )}

        {note.tags?.length > 0 && (
          <div className="note-card-tags">
            {note.tags.map((tagName) => (
              <span
                key={tagName}
                className={`tag-chip tag-${
                  tagColors[tagName] || "blue"
                }`}
              >
                {t(`tags.${tagName}`)}
              </span>
            ))}
          </div>
        )}

        {note.isFavorite && activeView === "all" && (
          <span className="pinned-label">
            <Pin size={12} />
            {t("notes.pinned")}
          </span>
        )}
      </article>
    );
  }

  const currentFolder =
    activeView === "folder"
      ? folders.find(
          (folder) => folder.id === notes[0]?.folderId
        )
      : null;

  const pageTitle =
    activeView === "tag"
      ? t(`tags.${activeTag}`, { defaultValue: activeTag })
      : activeView === "trash"
        ? t("notes.trash")
        : activeView === "favorites"
          ? t("notes.pinnedNotes")
          : activeView === "folder"
            ? currentFolder?.name || t("notes.folderTitle")
            : activeView === "completed"
              ? isPersian
                ? "یادداشت‌های انجام‌شده"
                : "Completed Tasks"
              : t("notes.allNotes");

  const pinnedNotes =
    activeView === "all"
      ? notes.filter(
          (note) =>
            note.isFavorite &&
            !note.isTrashed &&
            !note.isCompleted
        )
      : [];

  const regularNotes =
    activeView === "all"
      ? notes.filter(
          (note) =>
            !note.isFavorite &&
            !note.isTrashed &&
            !note.isCompleted
        )
      : notes;

  const layoutClass =
    viewMode === "list"
      ? "notes-items list-view"
      : "notes-items grid-view";

  return (
    <section className="notes-list">
      {activeView === "all" ? (
        <>
          {pinnedNotes.length > 0 && (
            <div className="notes-section">
              <h2 className="notes-section-heading">
                <Pin size={17} />
                {t("notes.pinned")}
              </h2>

              <div className={layoutClass}>
                {pinnedNotes.map(renderNoteCard)}
              </div>
            </div>
          )}

          <div className="notes-section">
            <h2 className="notes-section-heading">
              <FileText size={17} />
              {t("notes.allNotes")}
            </h2>

            {regularNotes.length > 0 ? (
              <div className={layoutClass}>
                {regularNotes.map(renderNoteCard)}
              </div>
            ) : (
              pinnedNotes.length === 0 && (
                <p className="notes-hint">
                  {t("notes.noNotesCreate")}
                </p>
              )
            )}
          </div>
        </>
      ) : (
        <div className="notes-section">
          <h2 className="notes-section-heading">
            {activeView === "completed" ? (
              <CheckCircle2 size={18} color="#269b70" />
            ) : (
              <FileText size={17} />
            )}

            {pageTitle}
          </h2>

          {notes.length > 0 ? (
            <div className={layoutClass}>
              {notes.map(renderNoteCard)}
            </div>
          ) : (
            <p className="notes-hint">
              {activeView === "trash"
                ? t("notes.emptyTrash")
                : activeView === "tag"
                  ? t("notes.noTaggedNotes", {
                      tag: t(`tags.${activeTag}`, {
                        defaultValue: activeTag,
                      }),
                    })
                  : activeView === "completed"
                    ? isPersian
                      ? "هنوز یادداشتی را تکمیل نکرده‌ای."
                      : "You haven't completed any notes yet."
                    : t("notes.noNotesHere")}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default NotesList;
