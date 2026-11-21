
import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, CalendarDays, Clock3 } from "lucide-react";

function CompletedTasks({
  notes = [],
  onToggleComplete,
  isPersian,
  isDarkMode,
}) {
  const [period, setPeriod] = useState("day");

  const colors = {
    background: isDarkMode ? "#20232d" : "#f8f9fc",
    card: isDarkMode ? "#292d39" : "#ffffff",
    text: isDarkMode ? "#f1f2f6" : "#242633",
    muted: isDarkMode ? "#a5a9b8" : "#858899",
    border: isDarkMode ? "#3a3e4c" : "#ececf2",
    soft: isDarkMode ? "#303441" : "#f4f5f9",
  };

  const completedNotes = useMemo(
    () =>
      notes
        .filter(
          (note) =>
            note.isCompleted &&
            !note.isTrashed &&
            note.completedAt
        )
        .sort(
          (a, b) =>
            new Date(b.completedAt) - new Date(a.completedAt)
        ),
    [notes]
  );

  function getWeekStart(date) {
    const result = new Date(date);
    const day = result.getDay();

    // هفته از شنبه شروع می‌شود
    result.setDate(result.getDate() - ((day + 1) % 7));
    result.setHours(0, 0, 0, 0);

    return result;
  }

  function getGroupKey(date) {
    if (period === "day") {
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }

    if (period === "week") {
      const start = getWeekStart(date);
      return `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`;
    }

    return `${date.getFullYear()}-${date.getMonth()}`;
  }

  function getGroupTitle(date) {
    if (period === "day") {
      return new Intl.DateTimeFormat(
        isPersian ? "fa-IR" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ).format(date);
    }

    if (period === "month") {
      return new Intl.DateTimeFormat(
        isPersian ? "fa-IR" : "en-US",
        {
          year: "numeric",
          month: "long",
        }
      ).format(date);
    }

    const start = getWeekStart(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const formatter = new Intl.DateTimeFormat(
      isPersian ? "fa-IR" : "en-US",
      {
        month: "short",
        day: "numeric",
      }
    );

    return `${formatter.format(start)} – ${formatter.format(end)}`;
  }

  const groups = useMemo(() => {
    const result = [];

    completedNotes.forEach((note) => {
      const date = new Date(note.completedAt);
      const key = getGroupKey(date);

      let group = result.find((item) => item.key === key);

      if (!group) {
        group = {
          key,
          title: getGroupTitle(date),
          notes: [],
        };

        result.push(group);
      }

      group.notes.push(note);
    });

    return result;
  }, [completedNotes, period, isPersian]);

  function formatTime(date) {
    return new Intl.DateTimeFormat(
      isPersian ? "fa-IR" : "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(new Date(date));
  }

  const periodOptions = [
    {
      value: "day",
      label: isPersian ? "روزانه" : "Daily",
    },
    {
      value: "week",
      label: isPersian ? "هفتگی" : "Weekly",
    },
    {
      value: "month",
      label: isPersian ? "ماهانه" : "Monthly",
    },
  ];

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
        padding: "30px",
        background: colors.background,
        color: colors.text,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "25px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <CheckCircle2 size={27} color="#36a878" />
            <h1 style={{ fontSize: "25px", margin: 0, fontWeight: 800 }}>
              {isPersian ? "یادداشت‌های انجام‌شده" : "Completed Tasks"}
            </h1>
          </div>

          <p style={{ color: colors.muted, margin: 0, fontSize: "14px" }}>
            {isPersian
              ? "مروری بر کارهایی که با موفقیت به پایان رسانده‌ای"
              : "A history of everything you've successfully completed"}
          </p>
        </div>

        <div
          style={{
            padding: "12px 17px",
            borderRadius: "13px",
            background: colors.card,
            border: `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            gap: "9px",
          }}
        >
          <CheckCircle2 size={18} color="#36a878" />
          <strong style={{ fontSize: "20px" }}>
            {completedNotes.length}
          </strong>
          <span style={{ fontSize: "12px", color: colors.muted }}>
            {isPersian ? "کار تکمیل‌شده" : "completed"}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        {periodOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setPeriod(option.value)}
            style={{
              border: `1px solid ${
                period === option.value ? "#36a878" : colors.border
              }`,
              background:
                period === option.value
                  ? isDarkMode
                    ? "#203d35"
                    : "#e8f7ef"
                  : colors.card,
              color: period === option.value ? "#36a878" : colors.muted,
              borderRadius: "10px",
              padding: "9px 18px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {option.label}
          </button>
        ))}
      </div>

      {groups.length === 0 ? (
        <div
          style={{
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: "17px",
            padding: "65px 20px",
            textAlign: "center",
          }}
        >
          <CheckCircle2
            size={42}
            color="#36a878"
            style={{ marginBottom: "15px" }}
          />

          <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>
            {isPersian
              ? "هنوز یادداشتی را تکمیل نکرده‌ای"
              : "No completed tasks yet"}
          </h3>

          <p style={{ color: colors.muted, fontSize: "13px", margin: 0 }}>
            {isPersian
              ? "با زدن تیک کنار هر یادداشت، آن را به این بخش منتقل کن."
              : "Check a note to move it into this section."}
          </p>
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.key} style={{ marginBottom: "25px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                marginBottom: "13px",
              }}
            >
              <CalendarDays size={17} color="#36a878" />
              <h2 style={{ fontSize: "14px", margin: 0, fontWeight: 800 }}>
                {group.title}
              </h2>
              <span style={{ color: colors.muted, fontSize: "12px" }}>
                ({group.notes.length})
              </span>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              {group.notes.map((note) => (
                <article
                  key={note.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "13px",
                    padding: "16px",
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "13px",
                  }}
                >
                  <CheckCircle2
                    size={21}
                    color="#36a878"
                    style={{ flexShrink: 0 }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        margin: "0 0 5px",
                        fontSize: "14px",
                        textDecoration: "line-through",
                        opacity: 0.75,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {note.title ||
                        (isPersian ? "بدون عنوان" : "Untitled")}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: colors.muted,
                        fontSize: "12px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {note.content ||
                        (isPersian ? "بدون توضیحات" : "No description")}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        color: colors.muted,
                        fontSize: "11px",
                        marginTop: "8px",
                      }}
                    >
                      <Clock3 size={12} />
                      {formatTime(note.completedAt)}
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleComplete(note.id)}
                    title={
                      isPersian
                        ? "بازگرداندن به یادداشت‌های فعال"
                        : "Restore to active notes"
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: `1px solid ${colors.border}`,
                      background: colors.soft,
                      color: colors.muted,
                      borderRadius: "9px",
                      padding: "8px 10px",
                      cursor: "pointer",
                      fontSize: "12px",
                      flexShrink: 0,
                    }}
                  >
                    <RotateCcw size={14} />
                    {isPersian ? "بازگردانی" : "Undo"}
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default CompletedTasks;
