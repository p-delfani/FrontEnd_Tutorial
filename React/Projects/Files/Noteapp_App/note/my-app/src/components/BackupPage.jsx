
import { useRef, useState } from "react";
import {
  Database,
  Download,
  Upload,
  ShieldCheck,
  FileJson,
  AlertTriangle,
  CheckCircle2,
  FileText,
} from "lucide-react";

function BackupPage({
  notes = [],
  folders = [],
  activities = [],
  onRestore,
  isPersian,
  isDarkMode,
}) {
  const fileInputRef = useRef(null);

  const [message, setMessage] = useState(null);
  const [isRestoring, setIsRestoring] = useState(false);

  const colors = {
    background: isDarkMode ? "#20232d" : "#f8f9fc",
    card: isDarkMode ? "#292d39" : "#ffffff",
    text: isDarkMode ? "#f1f2f6" : "#242633",
    muted: isDarkMode ? "#a5a9b8" : "#858899",
    border: isDarkMode ? "#3a3e4c" : "#ececf2",
  };

  function downloadBackup() {
    try {
      const backupData = {
        app: "Smart Notes",
        version: 1,
        exportedAt: new Date().toISOString(),
        data: { notes, folders, activities },
      };

      const blob = new Blob(
        [JSON.stringify(backupData, null, 2)],
        { type: "application/json;charset=utf-8" }
      );

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const date = new Date().toISOString().slice(0, 10);

      link.href = url;
      link.download = `smart-notes-backup-${date}.json`;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.setTimeout(() => URL.revokeObjectURL(url), 1500);

      setMessage({
        type: "success",
        text: isPersian
          ? "فایل پشتیبان JSON با موفقیت آماده دانلود شد."
          : "JSON backup was successfully prepared for download.",
      });
    } catch (error) {
      console.error("Backup download error:", error);
      setMessage({
        type: "error",
        text: isPersian
          ? "در ایجاد فایل پشتیبان مشکلی پیش آمد."
          : "Something went wrong while creating the backup.",
      });
    }
  }

  function escapeHTML(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function exportPDF() {
    try {
      const printableNotes = notes.filter(
        (note) => !note.isTrashed
      );

      if (printableNotes.length === 0) {
        setMessage({
          type: "error",
          text: isPersian
            ? "یادداشتی برای خروجی گرفتن وجود ندارد."
            : "There are no notes available to export.",
        });
        return;
      }

      const folderMap = new Map(
        folders.map((folder) => [folder.id, folder.name])
      );

      const noteHTML = printableNotes.map((note) => {
        const tags = Array.isArray(note.tags) ? note.tags : [];
        const folderName = folderMap.get(note.folderId);

        const dateValue =
          note.updatedAt || note.createdAt || note.completedAt;

        const date = dateValue
          ? new Date(dateValue).toLocaleDateString(
              isPersian ? "fa-IR" : "en-US"
            )
          : "—";

        return `
          <article class="note">
            <h2>${escapeHTML(note.title || (isPersian ? "بدون عنوان" : "Untitled"))}</h2>

            <div class="metadata">
              <span>${isPersian ? "تاریخ:" : "Date:"} ${escapeHTML(date)}</span>
              ${
                folderName
                  ? `<span>${isPersian ? "پوشه:" : "Folder:"} ${escapeHTML(folderName)}</span>`
                  : ""
              }
              ${
                note.isCompleted
                  ? `<span>${isPersian ? "وضعیت: انجام‌شده" : "Status: Completed"}</span>`
                  : ""
              }
            </div>

            ${
              tags.length
                ? `<div class="tags">${tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join("")}</div>`
                : ""
            }

            <div class="content">${escapeHTML(note.content || "").replace(/\n/g, "<br>")}</div>
          </article>
        `;
      }).join("");

      const printWindow = window.open("", "_blank");

      if (!printWindow) {
        setMessage({
          type: "error",
          text: isPersian
            ? "پنجره خروجی باز نشد. اجازه باز شدن پنجره‌های جدید را در مرورگر فعال کن."
            : "The print window was blocked. Please allow pop-ups in your browser.",
        });
        return;
      }

      printWindow.document.open();
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="${isPersian ? "fa" : "en"}" dir="${isPersian ? "rtl" : "ltr"}">
          <head>
            <meta charset="UTF-8" />
            <title>${isPersian ? "یادداشت‌های من - Smart Notes" : "My Notes - Smart Notes"}</title>

            <style>
              * {
                box-sizing: border-box;
              }

              body {
                font-family: Tahoma, Arial, sans-serif;
                direction: ${isPersian ? "rtl" : "ltr"};
                color: #252633;
                background: white;
                margin: 0;
                padding: 35px;
              }

              header {
                text-align: center;
                padding-bottom: 20px;
                margin-bottom: 30px;
                border-bottom: 2px solid #8171df;
              }

              header h1 {
                font-size: 25px;
                margin: 0 0 10px;
              }

              header p {
                color: #777;
                font-size: 12px;
              }

              .note {
                border: 1px solid #e5e3ed;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
                page-break-inside: avoid;
                break-inside: avoid;
              }

              .note h2 {
                font-size: 18px;
                margin: 0 0 12px;
                color: #51458f;
              }

              .metadata {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                color: #777;
                font-size: 11px;
                margin-bottom: 12px;
              }

              .tags {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                margin-bottom: 14px;
              }

              .tags span {
                background: #f0edff;
                color: #6755b5;
                padding: 4px 9px;
                border-radius: 20px;
                font-size: 10px;
              }

              .content {
                font-size: 13px;
                line-height: 2;
                white-space: normal;
                overflow-wrap: anywhere;
              }

              @page {
                size: A4;
                margin: 16mm;
              }

              @media print {
                body {
                  padding: 0;
                }
              }
            </style>
          </head>

          <body>
            <header>
              <h1>${isPersian ? "یادداشت‌های من" : "My Notes"}</h1>
              <p>Smart Notes · ${new Date().toLocaleDateString(isPersian ? "fa-IR" : "en-US")}</p>
              <p>${isPersian ? `تعداد یادداشت‌ها: ${printableNotes.length}` : `Total notes: ${printableNotes.length}`}</p>
            </header>

            ${noteHTML}
          </body>
        </html>
      `);
      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };

      setMessage({
        type: "success",
        text: isPersian
          ? "پنجره چاپ باز شد. گزینه Save as PDF را انتخاب کن."
          : "Print window opened. Choose Save as PDF.",
      });
    } catch (error) {
      console.error("PDF export error:", error);
      setMessage({
        type: "error",
        text: isPersian
          ? "در آماده‌سازی خروجی PDF مشکلی پیش آمد."
          : "Something went wrong while preparing the PDF.",
      });
    }
  }

  function openFilePicker() {
    setMessage(null);
    fileInputRef.current?.click();
  }

  function validateBackup(backup) {
    if (
      !backup ||
      backup.app !== "Smart Notes" ||
      backup.version !== 1 ||
      !backup.data ||
      !Array.isArray(backup.data.notes) ||
      !Array.isArray(backup.data.folders) ||
      !Array.isArray(backup.data.activities)
    ) {
      return false;
    }

    const notesAreValid = backup.data.notes.every(
      (note) =>
        note &&
        typeof note === "object" &&
        note.id !== undefined &&
        typeof note.title === "string" &&
        typeof note.content === "string"
    );

    const foldersAreValid = backup.data.folders.every(
      (folder) =>
        folder &&
        typeof folder === "object" &&
        folder.id !== undefined &&
        typeof folder.name === "string"
    );

    const activitiesAreValid = backup.data.activities.every(
      (activity) =>
        activity &&
        typeof activity === "object" &&
        activity.id !== undefined &&
        typeof activity.type === "string" &&
        activityTypes.includes(activity.type)
    );

    return notesAreValid && foldersAreValid && activitiesAreValid;
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".json")) {
      setMessage({
        type: "error",
        text: isPersian
          ? "لطفاً یک فایل با فرمت JSON انتخاب کن."
          : "Please select a JSON file.",
      });
      event.target.value = "";
      return;
    }

    setIsRestoring(true);
    setMessage(null);

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const backup = JSON.parse(reader.result);

        if (!validateBackup(backup)) {
          throw new Error("Invalid backup format");
        }

        const confirmed = window.confirm(
          isPersian
            ? "با بازیابی این فایل، یادداشت‌ها، پوشه‌ها و تاریخچه فعلی جایگزین می‌شوند. آیا مطمئنی؟"
            : "Restoring this backup will replace your current notes, folders, and activity history. Continue?"
        );

        if (!confirmed) return;

        onRestore(backup.data);

        setMessage({
          type: "success",
          text: isPersian
            ? "اطلاعات با موفقیت بازیابی شدند."
            : "Your data has been restored successfully.",
        });
      } catch (error) {
        console.error("Backup restore error:", error);
        setMessage({
          type: "error",
          text: isPersian
            ? "فایل انتخاب‌شده معتبر نیست."
            : "The selected backup file is invalid.",
        });
      } finally {
        setIsRestoring(false);
        event.target.value = "";
      }
    };

    reader.onerror = () => {
      setMessage({
        type: "error",
        text: isPersian
          ? "خواندن فایل با خطا مواجه شد."
          : "Could not read the selected file.",
      });
      setIsRestoring(false);
      event.target.value = "";
    };

    reader.readAsText(file);
  }

  const cardStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: "18px",
    padding: "25px",
  };

  const primaryButton = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    padding: "12px 18px",
    border: "none",
    borderRadius: "11px",
    background: "#8171df",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100%",
        height: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
        background: colors.background,
        color: colors.text,
      }}
    >
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "9px" }}>
          <div style={{
            width: "44px",
            height: "44px",
            borderRadius: "14px",
            display: "grid",
            placeItems: "center",
            color: "#8171df",
            background: isDarkMode ? "#38334f" : "#f0edff",
          }}>
            <Database size={23} />
          </div>

          <h1 style={{ fontSize: "25px", fontWeight: 800, margin: 0 }}>
            {isPersian ? "پشتیبان‌گیری و خروجی" : "Backup & Export"}
          </h1>
        </div>

        <p style={{ color: colors.muted, fontSize: "14px", margin: 0 }}>
          {isPersian
            ? "از اطلاعاتت محافظت کن و هر زمان خواستی آن‌ها را بازیابی یا خروجی بگیر."
            : "Protect your data, restore it, or export your notes."}
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))",
        gap: "13px",
        marginBottom: "22px",
      }}>
        {[
          { label: isPersian ? "یادداشت‌ها" : "Notes", value: notes.length, icon: FileJson, color: "#8171df" },
          { label: isPersian ? "پوشه‌ها" : "Folders", value: folders.length, icon: Database, color: "#36a878" },
          { label: isPersian ? "فعالیت‌ها" : "Activities", value: activities.length, icon: ShieldCheck, color: "#d99b55" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} style={cardStyle}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                color: item.color,
                marginBottom: "12px",
                fontSize: "12px",
                fontWeight: 600,
              }}>
                <Icon size={17} />
                {item.label}
              </div>
              <strong style={{ fontSize: "25px" }}>{item.value}</strong>
            </div>
          );
        })}
      </div>

      <section style={{ ...cardStyle, marginBottom: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
          <Download size={22} color="#36a878" />
          <div>
            <h2 style={{ fontSize: "17px", margin: "0 0 5px" }}>
              {isPersian ? "ایجاد فایل پشتیبان" : "Create a Backup"}
            </h2>
            <p style={{ color: colors.muted, fontSize: "12px", margin: 0 }}>
              {isPersian ? "دانلود نسخه‌ای از تمام اطلاعات Smart Notes" : "Download a copy of all your Smart Notes data."}
            </p>
          </div>
        </div>

        <p style={{ color: colors.muted, fontSize: "13px", lineHeight: 1.9, marginBottom: "18px" }}>
          {isPersian
            ? `این فایل شامل ${notes.length} یادداشت، ${folders.length} پوشه و ${activities.length} فعالیت است.`
            : `This backup includes ${notes.length} notes, ${folders.length} folders, and ${activities.length} activities.`}
        </p>

        <button type="button" onClick={downloadBackup} style={primaryButton}>
          <Download size={16} />
          {isPersian ? "دانلود فایل پشتیبان JSON" : "Download JSON Backup"}
        </button>
      </section>

      <section style={{ ...cardStyle, marginBottom: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
          <FileText size={23} color="#d99b55" />
          <div>
            <h2 style={{ fontSize: "17px", margin: "0 0 5px" }}>
              {isPersian ? "خروجی PDF یادداشت‌ها" : "Export Notes as PDF"}
            </h2>
            <p style={{ color: colors.muted, fontSize: "12px", margin: 0 }}>
              {isPersian
                ? "دریافت نسخه قابل چاپ از یادداشت‌ها با پشتیبانی از زبان فارسی"
                : "Create a printable PDF of your notes."}
            </p>
          </div>
        </div>

        <p style={{ color: colors.muted, fontSize: "13px", lineHeight: 1.9, marginBottom: "18px" }}>
          {isPersian
            ? "یادداشت‌های حذف‌شده وارد خروجی نمی‌شوند. در پنجره چاپ، گزینه Save as PDF را انتخاب کن."
            : "Trashed notes are excluded. Choose Save as PDF in the print window."}
        </p>

        <button
          type="button"
          onClick={exportPDF}
          style={{ ...primaryButton, background: "#d99b55" }}
        >
          <FileText size={16} />
          {isPersian ? "دریافت خروجی PDF" : "Export PDF"}
        </button>
      </section>

      <section style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
          <Upload size={22} color="#55a6cf" />
          <div>
            <h2 style={{ fontSize: "17px", margin: "0 0 5px" }}>
              {isPersian ? "بازیابی اطلاعات" : "Restore Data"}
            </h2>
            <p style={{ color: colors.muted, fontSize: "12px", margin: 0 }}>
              {isPersian ? "بازیابی اطلاعات از یک فایل پشتیبان قبلی" : "Restore your data from a previous backup file."}
            </p>
          </div>
        </div>

        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          padding: "13px",
          borderRadius: "11px",
          background: isDarkMode ? "#493a2b" : "#fff4e6",
          color: isDarkMode ? "#e6b77e" : "#a87536",
          fontSize: "12px",
          lineHeight: 1.9,
          marginBottom: "18px",
        }}>
          <AlertTriangle size={17} style={{ flexShrink: 0, marginTop: "2px" }} />
          <span>
            {isPersian
              ? "توجه: بازیابی، اطلاعات فعلی را با اطلاعات فایل پشتیبان جایگزین می‌کند."
              : "Warning: Restoring a backup replaces your current data."}
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <button
          type="button"
          onClick={openFilePicker}
          disabled={isRestoring}
          style={{
            ...primaryButton,
            background: isDarkMode ? "#3d5060" : "#eaf6fc",
            color: isDarkMode ? "#a9d8ef" : "#378bb5",
            opacity: isRestoring ? 0.6 : 1,
            cursor: isRestoring ? "wait" : "pointer",
          }}
        >
          <Upload size={16} />
          {isRestoring
            ? isPersian ? "در حال بررسی فایل..." : "Checking file..."
            : isPersian ? "انتخاب فایل پشتیبان" : "Choose Backup File"}
        </button>
      </section>

      {message && (
        <div
          role="status"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            marginTop: "18px",
            padding: "14px 16px",
            borderRadius: "12px",
            background: message.type === "success"
              ? isDarkMode ? "#203d35" : "#e8f7ef"
              : isDarkMode ? "#49313a" : "#ffedf0",
            color: message.type === "success" ? "#36a878" : "#dc8292",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {message.type === "success"
            ? <CheckCircle2 size={18} />
            : <AlertTriangle size={18} />}
          {message.text}
        </div>
      )}

      <p style={{
        color: colors.muted,
        textAlign: "center",
        fontSize: "11px",
        marginTop: "25px",
      }}>
        {isPersian
          ? "فرمت پشتیبان: JSON · فرمت خروجی: PDF"
          : "Backup format: JSON · Export format: PDF"}
      </p>
    </div>
  );
}

const activityTypes = [
  "created",
  "updated",
  "trashed",
  "restored",
  "deleted",
  "completed",
  "uncompleted",
];

export default BackupPage;
