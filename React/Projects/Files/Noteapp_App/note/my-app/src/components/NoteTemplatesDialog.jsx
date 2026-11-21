
import { useState } from "react";
import {
  X,
  BookHeart,
  CalendarDays,
  ListTodo,
  FileText,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
} from "lucide-react";

const templates = [
  {
    id: "journal",
    icon: BookHeart,
    color: "#e58ca3",
    background: "#fff0f4",
    title: {
      fa: "یادداشت روزانه",
      en: "Daily Journal",
    },
    description: {
      fa: "ثبت اتفاقات، احساسات و لحظه‌های روزانه",
      en: "Capture your daily moments, thoughts and feelings",
    },
    content: {
      fa: `امروز چه کارهایی انجام دادم؟

بهترین اتفاق امروز:

احساسات و افکارم:

چیزی که امروز یاد گرفتم:

برای فردا چه برنامه‌ای دارم؟`,
      en: `What did I do today?

The best moment of today:

My thoughts and feelings:

Something I learned today:

What are my plans for tomorrow?`,
    },
  },
  {
    id: "planner",
    icon: CalendarDays,
    color: "#8b7bea",
    background: "#f1efff",
    title: {
      fa: "برنامه‌ریزی روزانه",
      en: "Daily Planner",
    },
    description: {
      fa: "برنامه روز، اولویت‌ها و هدف‌هایی که می‌خواهی انجام بدهی",
      en: "Organize your schedule, priorities and daily goals",
    },
    content: {
      fa: `اهداف امروز:

۱.

۲.

۳.


اولویت‌های اصلی:

□ اولویت اول

□ اولویت دوم

□ اولویت سوم


برنامه زمانی:

صبح:

ظهر:

عصر:

شب:


یادداشت‌های تکمیلی:`,
      en: `Today's Goals:

1.

2.

3.


Top Priorities:

[ ] First priority

[ ] Second priority

[ ] Third priority


Schedule:

Morning:

Afternoon:

Evening:

Night:


Additional Notes:`,
    },
  },
  {
    id: "todo",
    icon: ListTodo,
    color: "#36a878",
    background: "#eaf8f1",
    title: {
      fa: "فهرست کارها",
      en: "To-Do List",
    },
    description: {
      fa: "کارهایت را بنویس و پس از انجام علامت بزن",
      en: "List your tasks and check them off as you complete them",
    },
    content: {
      fa: `کارهای من:

□ 

□ 

□ 

□ 

□ 

□ 


کارهای مهم‌تر:

□ 

□ 


یادداشت‌ها:`,
      en: `My Tasks:

[ ] 

[ ] 

[ ] 

[ ] 

[ ] 

[ ] 


Important Tasks:

[ ] 

[ ] 


Notes:`,
    },
  },
  {
    id: "blank",
    icon: FileText,
    color: "#55a6cf",
    background: "#eaf6fc",
    title: {
      fa: "یادداشت خالی",
      en: "Blank Note",
    },
    description: {
      fa: "از یک صفحه خالی شروع کن و هر چیزی دوست داری بنویس",
      en: "Start with a blank page and write anything you want",
    },
    content: {
      fa: "",
      en: "",
    },
  },
];

function NoteTemplatesDialog({
  isPersian,
  isDarkMode,
  onSelect,
  onClose,
}) {
  const [selectedTemplateId, setSelectedTemplateId] = useState("journal");

  const dark = isDarkMode;

  const colors = {
    background: dark ? "#292d39" : "#ffffff",
    text: dark ? "#f1f2f6" : "#242633",
    muted: dark ? "#a5a9b8" : "#858899",
    border: dark ? "#414655" : "#ececf2",
    card: dark ? "#303441" : "#ffffff",
    soft: dark ? "#383d4c" : "#faf9ff",
    preview: dark ? "#252936" : "#f8f8fc",
    selected: dark ? "#403b5a" : "#f0edff",
  };

  const selectedTemplate =
    templates.find((item) => item.id === selectedTemplateId) ||
    templates[0];

  const DirectionIcon = isPersian ? ArrowLeft : ArrowRight;

  const handleCreate = () => {
    onSelect({
      id: selectedTemplate.id,
      title: selectedTemplate.title[isPersian ? "fa" : "en"],
      content: selectedTemplate.content[isPersian ? "fa" : "en"],
    });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(12, 14, 25, 0.65)",
        backdropFilter: "blur(8px)",
        boxSizing: "border-box",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isPersian ? "انتخاب قالب یادداشت" : "Choose a note template"}
        onClick={(event) => event.stopPropagation()}
        dir={isPersian ? "rtl" : "ltr"}
        style={{
          width: "min(760px, 100%)",
          maxHeight: "min(780px, 92vh)",
          overflowY: "auto",
          padding: "26px",
          boxSizing: "border-box",
          borderRadius: "23px",
          background: colors.background,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          boxShadow: "0 25px 80px rgba(0,0,0,0.28)",
          animation: "templateDialogIn 0.22s ease",
          fontFamily: "inherit",
        }}
      >
        <style>
          {`
            @keyframes templateDialogIn {
              from {
                opacity: 0;
                transform: translateY(12px) scale(0.98);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            .template-option {
              transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
            }

            .template-option:hover {
              transform: translateY(-3px);
            }

            .template-option:focus-visible {
              outline: 2px solid #8b7bea;
              outline-offset: 3px;
            }

            .template-create-button {
              transition: transform 0.2s ease, opacity 0.2s ease;
            }

            .template-create-button:hover {
              transform: translateY(-2px);
              opacity: 0.92;
            }

            .template-create-button:active {
              transform: scale(0.98);
            }
          `}
        </style>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                marginBottom: "9px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "12px",
                  display: "grid",
                  placeItems: "center",
                  background: colors.selected,
                  color: "#8b7bea",
                }}
              >
                <Sparkles size={20} />
              </div>

              <span
                style={{
                  color: "#8b7bea",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.4px",
                }}
              >
                SMART NOTES
              </span>
            </div>

            <h2
              style={{
                fontSize: "22px",
                fontWeight: 800,
                margin: "0 0 8px",
              }}
            >
              {isPersian ? "چطور شروع کنیم؟" : "How would you like to start?"}
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "13px",
                lineHeight: 1.8,
                color: colors.muted,
              }}
            >
              {isPersian
                ? "یک قالب انتخاب کن و قبل از ساخت، پیش‌نمایش آن را ببین."
                : "Choose a template and preview it before creating your note."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={isPersian ? "بستن" : "Close"}
            style={{
              width: "36px",
              height: "36px",
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              border: `1px solid ${colors.border}`,
              borderRadius: "11px",
              background: colors.card,
              color: colors.muted,
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Template Selection */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))",
            gap: "11px",
            marginBottom: "22px",
          }}
        >
          {templates.map((template) => {
            const Icon = template.icon;
            const isSelected = selectedTemplateId === template.id;

            return (
              <button
                key={template.id}
                type="button"
                className="template-option"
                onClick={() => setSelectedTemplateId(template.id)}
                aria-pressed={isSelected}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: isPersian ? "right" : "left",
                  gap: "12px",
                  minHeight: "125px",
                  padding: "15px",
                  borderRadius: "15px",
                  border: `1.5px solid ${
                    isSelected ? template.color : colors.border
                  }`,
                  background: isSelected
                    ? dark
                      ? `${template.color}17`
                      : template.background
                    : colors.card,
                  color: colors.text,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "12px",
                    color: template.color,
                    background: dark
                      ? `${template.color}20`
                      : template.background,
                  }}
                >
                  <Icon size={20} />
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: 800,
                      margin: "0 0 5px",
                    }}
                  >
                    {template.title[isPersian ? "fa" : "en"]}
                  </h3>

                  <p
                    style={{
                      fontSize: "11px",
                      lineHeight: 1.7,
                      color: colors.muted,
                      margin: 0,
                    }}
                  >
                    {template.description[isPersian ? "fa" : "en"]}
                  </p>
                </div>

                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: isPersian ? "auto" : "10px",
                      right: isPersian ? "10px" : "auto",
                      width: "21px",
                      height: "21px",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background: template.color,
                      color: "#ffffff",
                    }}
                  >
                    <Check size={13} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Preview Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Eye size={17} color="#8b7bea" />

            <strong style={{ fontSize: "13px" }}>
              {isPersian ? "پیش‌نمایش قالب" : "Template Preview"}
            </strong>
          </div>

          <span
            style={{
              fontSize: "11px",
              color: selectedTemplate.color,
              fontWeight: 700,
            }}
          >
            {selectedTemplate.title[isPersian ? "fa" : "en"]}
          </span>
        </div>

        {/* Preview Content */}
        <div
          style={{
            background: colors.preview,
            border: `1px solid ${colors.border}`,
            borderRadius: "15px",
            padding: "20px",
            minHeight: "160px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              paddingBottom: "13px",
              marginBottom: "15px",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            {(() => {
              const PreviewIcon = selectedTemplate.icon;

              return (
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "10px",
                    color: selectedTemplate.color,
                    background: dark
                      ? `${selectedTemplate.color}20`
                      : selectedTemplate.background,
                  }}
                >
                  <PreviewIcon size={17} />
                </div>
              );
            })()}

            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "13px",
                  marginBottom: "3px",
                }}
              >
                {selectedTemplate.title[isPersian ? "fa" : "en"]}
              </strong>

              <span
                style={{
                  fontSize: "10px",
                  color: colors.muted,
                }}
              >
                {isPersian ? "نمونه ساختار یادداشت" : "Note structure preview"}
              </span>
            </div>
          </div>

          {selectedTemplate.content[isPersian ? "fa" : "en"] ? (
            <pre
              style={{
                fontFamily: "inherit",
                fontSize: "13px",
                lineHeight: 2.1,
                color: colors.text,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                margin: 0,
              }}
            >
              {selectedTemplate.content[isPersian ? "fa" : "en"]}
            </pre>
          ) : (
            <div
              style={{
                minHeight: "90px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                color: colors.muted,
                fontSize: "12px",
              }}
            >
              <FileText size={27} strokeWidth={1.5} />

              {isPersian
                ? "یک صفحه کاملاً خالی برای ایده‌های تو"
                : "A completely blank page for your ideas"}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            style={{
              color: colors.muted,
              fontSize: "11px",
              lineHeight: 1.7,
            }}
          >
            {isPersian
              ? "هر زمان خواستی می‌توانی محتوا را تغییر بدهی."
              : "You can customize your note anytime."}
          </span>

          <button
            type="button"
            className="template-create-button"
            onClick={handleCreate}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "9px",
              padding: "12px 19px",
              border: "none",
              borderRadius: "12px",
              background: "#8b7bea",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {isPersian ? "استفاده از این قالب" : "Use this template"}
            <DirectionIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteTemplatesDialog;
