
import { useMemo } from "react";

function Dashboard({
  notes = [],
  folders = [],
  isPersian = true,
  isDarkMode = false,
}) {
  const activeNotes = notes.filter((note) => !note.isTrashed);
  const trashedNotes = notes.filter((note) => note.isTrashed);
  const favoriteNotes = activeNotes.filter((note) => note.isFavorite);

  const colors = {
    background: isDarkMode ? "#20232d" : "#ffffff",
    card: isDarkMode ? "#292d39" : "#ffffff",
    text: isDarkMode ? "#f1f2f6" : "#242633",
    muted: isDarkMode ? "#a5a9b8" : "#858899",
    border: isDarkMode ? "#3a3e4c" : "#ececf2",
  };

  const tagDefinitions = [
    { name: "Work", fa: "کاری", color: "#7298e8" },
    { name: "Personal", fa: "شخصی", color: "#ad8be5" },
    { name: "Ideas", fa: "ایده‌ها", color: "#e8bd69" },
    { name: "Finance", fa: "مالی", color: "#69bd91" },
    { name: "Health", fa: "سلامتی", color: "#e58eae" },
  ];

  // Weekly activity data
  const weeklyActivity = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const count = activeNotes.filter((note) => {
        if (!note.createdAt) return false;

        const createdDate = new Date(note.createdAt);

        return createdDate >= date && createdDate < nextDate;
      }).length;

      days.push({
        date,
        count,
        key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      });
    }

    return days;
  }, [activeNotes]);

  const weeklyTotal = weeklyActivity.reduce(
    (total, day) => total + day.count,
    0
  );

  const activeDays = weeklyActivity.filter(
    (day) => day.count > 0
  ).length;

  const dailyAverage = (weeklyTotal / 7).toFixed(1);

  const maxActivity = Math.max(
    ...weeklyActivity.map((day) => day.count),
    1
  );

  const getTagCount = (tagName) =>
    activeNotes.filter((note) => note.tags?.includes(tagName)).length;

  const recentNotes = [...activeNotes]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || 0) -
        new Date(a.updatedAt || a.createdAt || 0)
    )
    .slice(0, 5);

  function formatDate(dateValue) {
    if (!dateValue) {
      return isPersian ? "بدون تاریخ" : "No date";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return isPersian ? "بدون تاریخ" : "No date";
    }

    return new Intl.DateTimeFormat(
      isPersian ? "fa-IR" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    ).format(date);
  }

  function getDayName(date) {
    return new Intl.DateTimeFormat(
      isPersian ? "fa-IR" : "en-US",
      { weekday: "short" }
    ).format(date);
  }

  const statCards = [
    {
      title: isPersian ? "تمام یادداشت‌ها" : "Total Notes",
      value: activeNotes.length,
      icon: "📝",
      color: "#8b7bea",
      background: isDarkMode ? "#38334f" : "#f0edff",
    },
    {
      title: isPersian ? "علاقه‌مندی‌ها" : "Favorites",
      value: favoriteNotes.length,
      icon: "⭐",
      color: "#d9a441",
      background: isDarkMode ? "#493e2c" : "#fff5df",
    },
    {
      title: isPersian ? "پوشه‌ها" : "Folders",
      value: folders.length,
      icon: "📁",
      color: "#55a6cf",
      background: isDarkMode ? "#2d414d" : "#e8f6fc",
    },
    {
      title: isPersian ? "سطل زباله" : "Trash",
      value: trashedNotes.length,
      icon: "🗑️",
      color: "#dc8292",
      background: isDarkMode ? "#49343d" : "#ffedf0",
    },
  ];

  const sectionTitle = {
    fontSize: "16px",
    fontWeight: 700,
    color: colors.text,
    marginBottom: "20px",
  };

  const panelStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: "16px",
    padding: "22px",
  };

  return (
    <div
      style={{
        padding: "28px",
        color: colors.text,
        background: colors.background,
        minHeight: "100%",
        overflowY: "auto",
      }}
    >
      {/* Dashboard Heading */}
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 800,
            margin: "0 0 8px",
            color: colors.text,
          }}
        >
          {isPersian ? "داشبورد" : "Dashboard"}
        </h1>

        <p style={{ color: colors.muted, margin: 0, fontSize: "14px" }}>
          {isPersian
            ? "خلاصه‌ای از فعالیت‌ها و یادداشت‌های شما"
            : "An overview of your notes and activity"}
        </p>
      </div>

      {/* Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "16px",
          marginBottom: "26px",
        }}
      >
        {statCards.map((item) => (
          <div
            key={item.title}
            style={{
              ...panelStyle,
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                minWidth: "52px",
                borderRadius: "14px",
                background: item.background,
                display: "grid",
                placeItems: "center",
                fontSize: "23px",
              }}
            >
              {item.icon}
            </div>

            <div>
              <p
                style={{
                  margin: "0 0 7px",
                  color: colors.muted,
                  fontSize: "13px",
                }}
              >
                {item.title}
              </p>

              <strong
                style={{
                  fontSize: "25px",
                  color: item.color,
                  fontWeight: 800,
                }}
              >
                {item.value}
              </strong>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Activity */}
      <section
        style={{
          ...panelStyle,
          marginBottom: "22px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "26px",
          }}
        >
          <div>
            <h3 style={{ ...sectionTitle, marginBottom: "6px" }}>
              {isPersian ? "فعالیت هفتگی" : "Weekly Activity"}
            </h3>

            <p
              style={{
                color: colors.muted,
                fontSize: "12px",
                margin: 0,
              }}
            >
              {isPersian
                ? "تعداد یادداشت‌های ایجادشده در ۷ روز اخیر"
                : "Notes created during the last 7 days"}
            </p>
          </div>

          <span
            style={{
              background: isDarkMode ? "#38334f" : "#f0edff",
              color: "#8b7bea",
              padding: "8px 13px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {weeklyTotal} {isPersian ? "یادداشت" : "Notes"}
          </span>
        </div>

        {/* Chart */}
        <div
          style={{
            height: "190px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            gap: "12px",
            padding: "0 5px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          {weeklyActivity.map((day) => {
            const barHeight =
              day.count === 0
                ? 4
                : Math.max((day.count / maxActivity) * 145, 10);

            const isToday =
              day.key ===
              `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;

            return (
              <div
                key={day.key}
                style={{
                  flex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "10px",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    color: colors.muted,
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {day.count}
                </span>

                <div
                  title={`${formatDate(day.date)}: ${day.count}`}
                  style={{
                    width: "min(100%, 38px)",
                    height: `${barHeight}px`,
                    minHeight: "4px",
                    borderRadius: "8px 8px 3px 3px",
                    background: isToday
                      ? "#8b7bea"
                      : isDarkMode
                        ? "#62618f"
                        : "#b8adf2",
                    transition: "height 0.3s ease",
                  }}
                />

                <span
                  style={{
                    fontSize: "11px",
                    color: isToday ? "#8b7bea" : colors.muted,
                    fontWeight: isToday ? 800 : 500,
                    paddingBottom: "10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getDayName(day.date)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Activity Summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "12px",
            marginTop: "22px",
          }}
        >
          <div
            style={{
              background: isDarkMode ? "#343847" : "#f8f7fc",
              borderRadius: "12px",
              padding: "14px",
            }}
          >
            <p style={{ color: colors.muted, fontSize: "12px", margin: "0 0 8px" }}>
              {isPersian ? "روزهای فعال" : "Active Days"}
            </p>
            <strong style={{ fontSize: "22px", color: colors.text }}>
              {activeDays} / 7
            </strong>
          </div>

          <div
            style={{
              background: isDarkMode ? "#343847" : "#f8f7fc",
              borderRadius: "12px",
              padding: "14px",
            }}
          >
            <p style={{ color: colors.muted, fontSize: "12px", margin: "0 0 8px" }}>
              {isPersian ? "میانگین روزانه" : "Daily Average"}
            </p>
            <strong style={{ fontSize: "22px", color: colors.text }}>
              {dailyAverage}
            </strong>
          </div>

          <div
            style={{
              background: isDarkMode ? "#343847" : "#f8f7fc",
              borderRadius: "12px",
              padding: "14px",
            }}
          >
            <p style={{ color: colors.muted, fontSize: "12px", margin: "0 0 8px" }}>
              {isPersian ? "مجموع این هفته" : "This Week"}
            </p>
            <strong style={{ fontSize: "22px", color: "#8b7bea" }}>
              {weeklyTotal}
            </strong>
          </div>
        </div>
      </section>

      {/* Main Dashboard Sections */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        {/* Tags Overview */}
        <section style={panelStyle}>
          <h3 style={sectionTitle}>
            {isPersian ? "یادداشت‌ها بر اساس دسته‌بندی" : "Notes by Category"}
          </h3>

          {tagDefinitions.map((tag) => {
            const count = getTagCount(tag.name);
            const percentage =
              activeNotes.length > 0
                ? Math.min((count / activeNotes.length) * 100, 100)
                : 0;

            return (
              <div key={tag.name} style={{ marginBottom: "19px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "9px",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: colors.text }}>
                    {isPersian ? tag.fa : tag.name}
                  </span>

                  <span style={{ color: colors.muted }}>{count}</span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    background: isDarkMode ? "#3a3e4c" : "#f0f0f5",
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${percentage}%`,
                      height: "100%",
                      background: tag.color,
                      borderRadius: "20px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </section>

        {/* Quick Summary */}
        <section style={panelStyle}>
          <h3 style={sectionTitle}>
            {isPersian ? "نمای کلی" : "Quick Overview"}
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "14px 0",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <span style={{ color: colors.muted, fontSize: "14px" }}>
              {isPersian ? "یادداشت‌های بدون دسته‌بندی" : "Untagged Notes"}
            </span>

            <strong>
              {
                activeNotes.filter(
                  (note) => !note.tags || note.tags.length === 0
                ).length
              }
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "14px 0",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <span style={{ color: colors.muted, fontSize: "14px" }}>
              {isPersian ? "یادداشت‌های دارای پوشه" : "Notes in Folders"}
            </span>

            <strong>
              {activeNotes.filter((note) => note.folderId).length}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "14px 0",
            }}
          >
            <span style={{ color: colors.muted, fontSize: "14px" }}>
              {isPersian ? "کل پوشه‌های ساخته‌شده" : "Created Folders"}
            </span>

            <strong>{folders.length}</strong>
          </div>
        </section>
      </div>

      {/* Recent Notes */}
      <section style={panelStyle}>
        <h3 style={sectionTitle}>
          {isPersian ? "آخرین یادداشت‌ها" : "Recent Notes"}
        </h3>

        {recentNotes.length === 0 ? (
          <p
            style={{
              color: colors.muted,
              fontSize: "14px",
              textAlign: "center",
              padding: "25px 0",
            }}
          >
            {isPersian
              ? "هنوز یادداشتی ایجاد نکرده‌اید."
              : "You haven't created any notes yet."}
          </p>
        ) : (
          <div>
            {recentNotes.map((note, index) => (
              <div
                key={note.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  padding: "14px 0",
                  borderBottom:
                    index !== recentNotes.length - 1
                      ? `1px solid ${colors.border}`
                      : "none",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      margin: "0 0 6px",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: colors.text,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {note.title ||
                      (isPersian ? "بدون عنوان" : "Untitled Note")}
                  </p>

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
                      (isPersian ? "بدون متن" : "No content")}
                  </p>
                </div>

                <span
                  style={{
                    color: colors.muted,
                    fontSize: "11px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatDate(note.updatedAt || note.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
