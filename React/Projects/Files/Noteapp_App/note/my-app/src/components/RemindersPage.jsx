
import { useMemo, useState } from "react";
import {
  Bell,
  Clock3,
  CalendarClock,
  AlertCircle,
  FileText,
  ExternalLink,
  X,
  CheckCircle2,
} from "lucide-react";

function RemindersPage({
  notes = [],
  onOpenNote,
  onClearReminder,
  isPersian = true,
  isDarkMode = false,
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  const colors = {
    background: isDarkMode ? "#20232d" : "#f8f9fc",
    card: isDarkMode ? "#292d39" : "#ffffff",
    text: isDarkMode ? "#f1f2f6" : "#242633",
    muted: isDarkMode ? "#a5a9b8" : "#858899",
    border: isDarkMode ? "#3a3e4c" : "#ececf2",
    soft: isDarkMode ? "#303441" : "#f4f5f9",
  };

  const now = Date.now();

  const reminders = useMemo(() => {
    return notes
      .filter(
        (note) =>
          note.reminderAt &&
          !note.isTrashed &&
          !note.isCompleted &&
          !Number.isNaN(new Date(note.reminderAt).getTime())
      )
      .map((note) => ({
        ...note,
        reminderTime: new Date(note.reminderAt).getTime(),
      }))
      .sort((a, b) => a.reminderTime - b.reminderTime);
  }, [notes]);

  const overdueReminders = reminders.filter(
    (note) => note.reminderTime <= now
  );

  const upcomingReminders = reminders.filter(
    (note) => note.reminderTime > now
  );

  const visibleReminders =
    activeFilter === "overdue"
      ? overdueReminders
      : activeFilter === "upcoming"
        ? upcomingReminders
        : reminders;

  function formatDate(dateValue) {
    return new Intl.DateTimeFormat(
      isPersian ? "fa-IR" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    ).format(new Date(dateValue));
  }

  function formatTime(dateValue) {
    return new Intl.DateTimeFormat(
      isPersian ? "fa-IR" : "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(new Date(dateValue));
  }

  function getRelativeLabel(timestamp) {
    const difference = timestamp - Date.now();

    if (difference <= 0) {
      return isPersian ? "سررسید شده" : "Overdue";
    }

    const minutes = Math.ceil(difference / 60000);

    if (minutes < 60) {
      return isPersian
        ? `${minutes} دقیقه دیگر`
        : `In ${minutes} minutes`;
    }

    const hours = Math.ceil(minutes / 60);

    if (hours < 24) {
      return isPersian
        ? `${hours} ساعت دیگر`
        : `In ${hours} hours`;
    }

    const days = Math.ceil(hours / 24);

    return isPersian
      ? `${days} روز دیگر`
      : `In ${days} days`;
  }

  const filters = [
    {
      id: "all",
      label: isPersian ? "همه یادآورها" : "All reminders",
      count: reminders.length,
    },
    {
      id: "upcoming",
      label: isPersian ? "آینده" : "Upcoming",
      count: upcomingReminders.length,
    },
    {
      id: "overdue",
      label: isPersian ? "سررسیدشده" : "Overdue",
      count: overdueReminders.length,
    },
  ];

  return (
    <div
      style={{
        height: "100%",
        minHeight: 0,
        overflowY: "auto",
        boxSizing: "border-box",
        padding: "30px",
        background: colors.background,
        color: colors.text,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "9px",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              display: "grid",
              placeItems: "center",
              borderRadius: "14px",
              background: isDarkMode ? "#403b5a" : "#f0edff",
              color: "#8b7bea",
            }}
          >
            <Bell size={23} />
          </div>

          <h1 style={{ fontSize: "25px", fontWeight: 800, margin: 0 }}>
            {isPersian ? "یادآورها" : "Reminders"}
          </h1>
        </div>

        <p
          style={{
            color: colors.muted,
            fontSize: "14px",
            margin: 0,
          }}
        >
          {isPersian
            ? "یادآوری‌های یادداشت‌هایت را مدیریت کن و هیچ کاری را فراموش نکن."
            : "Manage your note reminders and stay on top of everything."}
        </p>
      </div>

      {/* Statistics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "13px",
          marginBottom: "25px",
        }}
      >
        {[
          {
            label: isPersian ? "کل یادآورها" : "Total reminders",
            count: reminders.length,
            icon: Bell,
            color: "#8b7bea",
          },
          {
            label: isPersian ? "یادآورهای آینده" : "Upcoming",
            count: upcomingReminders.length,
            icon: CalendarClock,
            color: "#55a6cf",
          },
          {
            label: isPersian ? "سررسیدشده‌ها" : "Overdue",
            count: overdueReminders.length,
            icon: AlertCircle,
            color: "#dc8292",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              style={{
                padding: "18px",
                border: `1px solid ${colors.border}`,
                borderRadius: "15px",
                background: colors.card,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: item.color,
                  marginBottom: "12px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <Icon size={17} />
                {item.label}
              </div>

              <strong style={{ fontSize: "26px" }}>
                {item.count}
              </strong>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "9px",
          marginBottom: "20px",
        }}
      >
        {filters.map((filter) => {
          const selected = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 14px",
                borderRadius: "22px",
                border: `1px solid ${
                  selected ? "#8b7bea" : colors.border
                }`,
                background: selected
                  ? isDarkMode
                    ? "#38334f"
                    : "#f0edff"
                  : colors.card,
                color: selected ? "#8b7bea" : colors.muted,
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: selected ? 700 : 500,
              }}
            >
              {filter.label}

              <span
                style={{
                  minWidth: "19px",
                  height: "19px",
                  padding: "0 4px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "20px",
                  background: selected
                    ? "#8b7bea"
                    : colors.soft,
                  color: selected ? "#fff" : colors.muted,
                  fontSize: "10px",
                }}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reminder List */}
      {visibleReminders.length === 0 ? (
        <div
          style={{
            padding: "65px 20px",
            border: `1px solid ${colors.border}`,
            borderRadius: "18px",
            background: colors.card,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              display: "grid",
              placeItems: "center",
              margin: "0 auto 18px",
              borderRadius: "22px",
              background: isDarkMode ? "#38334f" : "#f0edff",
              color: "#8b7bea",
            }}
          >
            <Bell size={32} />
          </div>

          <h3 style={{ fontSize: "16px", margin: "0 0 8px" }}>
            {isPersian
              ? "یادآوری برای نمایش وجود ندارد"
              : "No reminders found"}
          </h3>

          <p
            style={{
              color: colors.muted,
              fontSize: "13px",
              margin: 0,
            }}
          >
            {isPersian
              ? "برای یادداشت‌هایت از بخش ویرایش، یادآور تنظیم کن."
              : "Set a reminder from the note editor to see it here."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "13px" }}>
          {visibleReminders.map((note) => {
            const isOverdue = note.reminderTime <= Date.now();

            return (
              <article
                key={note.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                  padding: "19px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "16px",
                  background: colors.card,
                  boxShadow: isDarkMode
                    ? "none"
                    : "0 3px 14px rgba(30,30,60,0.035)",
                }}
              >
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    minWidth: "45px",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "14px",
                    background: isOverdue
                      ? isDarkMode
                        ? "#49313a"
                        : "#ffedf0"
                      : isDarkMode
                        ? "#263d4b"
                        : "#eaf6fc",
                    color: isOverdue ? "#dc8292" : "#55a6cf",
                  }}
                >
                  {isOverdue ? (
                    <AlertCircle size={21} />
                  ) : (
                    <Clock3 size={21} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: "180px" }}>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 750,
                      margin: "0 0 8px",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {note.title ||
                      (isPersian ? "یادداشت بدون عنوان" : "Untitled note")}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "8px 14px",
                      color: colors.muted,
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                      <CalendarClock size={13} />
                      {formatDate(note.reminderAt)}
                    </span>

                    <span style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                      <Clock3 size={13} />
                      {formatTime(note.reminderAt)}
                    </span>
                  </div>

                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "9px",
                      padding: "5px 9px",
                      borderRadius: "7px",
                      background: isOverdue
                        ? isDarkMode
                          ? "#49313a"
                          : "#ffedf0"
                        : isDarkMode
                          ? "#263d4b"
                          : "#eaf6fc",
                      color: isOverdue ? "#dc8292" : "#55a6cf",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {getRelativeLabel(note.reminderTime)}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <button
                    onClick={() => onOpenNote(note.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "9px 12px",
                      border: "1px solid #8b7bea40",
                      borderRadius: "9px",
                      background: isDarkMode ? "#38334f" : "#f0edff",
                      color: "#8b7bea",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    <ExternalLink size={14} />
                    {isPersian ? "باز کردن" : "Open note"}
                  </button>

                  <button
                    onClick={() => {
                      const confirmed = window.confirm(
                        isPersian
                          ? "یادآور این یادداشت حذف شود؟"
                          : "Remove this reminder?"
                      );

                      if (confirmed) {
                        onClearReminder(note);
                      }
                    }}
                    title={isPersian ? "حذف یادآور" : "Remove reminder"}
                    style={{
                      width: "36px",
                      height: "36px",
                      display: "grid",
                      placeItems: "center",
                      border: `1px solid ${colors.border}`,
                      borderRadius: "9px",
                      background: colors.soft,
                      color: "#dc8292",
                      cursor: "pointer",
                    }}
                  >
                    <X size={17} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {reminders.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            marginTop: "20px",
            color: colors.muted,
            fontSize: "12px",
          }}
        >
          <CheckCircle2 size={14} />
          {isPersian
            ? `${reminders.length} یادآور فعال`
            : `${reminders.length} active reminders`}
        </div>
      )}
    </div>
  );
}

export default RemindersPage;
