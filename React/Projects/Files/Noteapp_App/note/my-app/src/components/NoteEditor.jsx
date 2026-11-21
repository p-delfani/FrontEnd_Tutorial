
import { useTranslation } from "react-i18next";
import {
  FileText,
  Check,
  Folder,
  Tag,
  Bell,
  X,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const noteColors = [
  { name: "purple", color: "#DCCBFA" },
  { name: "pink", color: "#F8C9D8" },
  { name: "orange", color: "#FFD6BE" },
  { name: "yellow", color: "#F9E7A8" },
  { name: "green", color: "#C7EBD5" },
  { name: "blue", color: "#C7E2F8" },
  { name: "lavender", color: "#D5D5F5" },
  { name: "coral", color: "#F6C5BC" },
  { name: "mint", color: "#BDE8E5" },
];

const availableTags = [
  "Work",
  "Personal",
  "Ideas",
  "Finance",
  "Health",
];

function NoteEditor({
  note,
  onUpdateNote,
  folders = [],
  onMakePrivate,
  onLock,
  isUnlocked = false,
}) {
  const { t, i18n } = useTranslation();
  const isPersian = i18n.language === "fa";

  if (!note) {
    return (
      <section className="note-editor empty-editor">
        <FileText size={45} />
        <h2>{t("notes.selectNote")}</h2>
        <p>{t("notes.selectNoteHint")}</p>
      </section>
    );
  }

  function updateField(field, value) {
    onUpdateNote({
      ...note,
      [field]: value,
    });
  }

  function toggleTag(tag) {
    const currentTags = note.tags || [];

    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter((item) => item !== tag)
      : [...currentTags, tag];

    updateField("tags", updatedTags);
  }

  function formatDateTimeLocal(value) {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const offset = date.getTimezoneOffset() * 60000;

    return new Date(date.getTime() - offset)
      .toISOString()
      .slice(0, 16);
  }

  function handleReminderChange(value) {
    updateField(
      "reminderAt",
      value ? new Date(value).toISOString() : null
    );
  }

  return (
    <section className="note-editor">

      {/* Private note security */}
      <div
        className="private-note-control"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        {note.isPrivate ? (
          <button
            type="button"
            className="private-note-button"
            onClick={() => onLock?.(note.id)}
            disabled={!isUnlocked || !onLock}
          >
            <LockKeyhole size={17} />
            {isPersian ? "قفل‌کردن یادداشت" : "Lock note"}
          </button>
        ) : (
          <button
            type="button"
            className="private-note-button"
            onClick={() => onMakePrivate?.(note)}
            disabled={!onMakePrivate}
          >
            <ShieldCheck size={17} />
            {isPersian
              ? "خصوصی‌کردن یادداشت"
              : "Make note private"}
          </button>
        )}

        {note.isPrivate && (
          <p className="private-note-hint">
            <LockKeyhole size={14} />
            {isPersian
              ? "این یادداشت با رمز عبور محافظت می‌شود."
              : "This note is protected by a password."}
          </p>
        )}
      </div>

      <div className="note-color-picker">
        <span>{t("notes.noteColor")}</span>

        <div className="color-options">
          {noteColors.map((item) => (
            <button
              key={item.name}
              type="button"
              className={`color-option ${
                (note.color || "purple") === item.name
                  ? "active"
                  : ""
              }`}
              style={{ backgroundColor: item.color }}
              title={t(`colors.${item.name}`)}
              aria-label={t(`colors.${item.name}`)}
              onClick={() => updateField("color", item.name)}
            >
              {(note.color || "purple") === item.name && (
                <Check size={15} color="#51475C" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="editor-folder-control">
        <label>
          <Folder size={16} />
          {t("notes.folder")}
        </label>

        <select
          value={note.folderId ?? ""}
          onChange={(event) =>
            updateField(
              "folderId",
              event.target.value
                ? Number(event.target.value)
                : null
            )
          }
        >
          <option value="">{t("notes.noFolder")}</option>

          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      <div className="editor-tags-control">
        <label>
          <Tag size={16} />
          {t("notes.tags")}
        </label>

        <div className="editor-tag-options">
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`editor-tag ${
                (note.tags || []).includes(tag) ? "active" : ""
              }`}
              onClick={() => toggleTag(tag)}
            >
              {t(`tags.${tag}`)}
              {(note.tags || []).includes(tag) && (
                <Check size={13} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reminder */}
      <div className="editor-reminder-control">
        <label>
          <Bell size={16} />
          {isPersian ? "یادآوری" : "Reminder"}
        </label>

        <div className="reminder-input-row">
          <input
            type="datetime-local"
            value={formatDateTimeLocal(note.reminderAt)}
            min={formatDateTimeLocal(new Date().toISOString())}
            onChange={(event) =>
              handleReminderChange(event.target.value)
            }
          />

          {note.reminderAt && (
            <button
              type="button"
              className="reminder-clear-button"
              onClick={() => updateField("reminderAt", null)}
              title={isPersian ? "حذف یادآوری" : "Remove reminder"}
            >
              <X size={16} />
              {isPersian ? "حذف" : "Clear"}
            </button>
          )}
        </div>

        {note.reminderAt && (
          <p className="reminder-hint">
            <Bell size={13} />
            {isPersian
              ? `زمان یادآوری: ${new Date(note.reminderAt).toLocaleString("fa-IR")}`
              : `Reminder: ${new Date(note.reminderAt).toLocaleString("en-US")}`}
          </p>
        )}
      </div>

      <input
        className="note-title-input"
        type="text"
        placeholder={t("notes.noteTitlePlaceholder")}
        value={note.title || ""}
        onChange={(event) =>
          updateField("title", event.target.value)
        }
      />

      <textarea
        className="note-content-input"
        placeholder={t("notes.noteContentPlaceholder")}
        value={note.content || ""}
        onChange={(event) =>
          updateField("content", event.target.value)
        }
      />
    </section>
  );
}

export default NoteEditor;
