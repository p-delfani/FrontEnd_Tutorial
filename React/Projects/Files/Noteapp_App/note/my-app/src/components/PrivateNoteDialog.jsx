
import { useState } from "react";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  X,
  ShieldCheck,
} from "lucide-react";

function PrivateNoteDialog({
  mode = "unlock",
  noteTitle = "",
  onSubmit,
  onClose,
  isPersian = true,
  isDarkMode = false,
  error = "",
  busy = false,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const isCreateMode = mode === "create";

  const colors = {
    background: isDarkMode ? "#292d39" : "#ffffff",
    text: isDarkMode ? "#f1f2f6" : "#242633",
    muted: isDarkMode ? "#a5a9b8" : "#858899",
    border: isDarkMode ? "#424756" : "#e9e9f0",
    input: isDarkMode ? "#20232d" : "#f8f9fc",
  };

  function handleSubmit(event) {
    event.preventDefault();
    setLocalError("");

    if (password.length < 4) {
      setLocalError(
        isPersian
          ? "رمز عبور باید حداقل ۴ کاراکتر باشد."
          : "Password must contain at least 4 characters."
      );
      return;
    }

    if (isCreateMode && password !== confirmPassword) {
      setLocalError(
        isPersian
          ? "تکرار رمز عبور با رمز اصلی مطابقت ندارد."
          : "Passwords do not match."
      );
      return;
    }

    onSubmit?.(password);
  }

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    borderRadius: "11px",
    border: `1px solid ${colors.border}`,
    background: colors.input,
    color: colors.text,
    fontSize: "14px",
    outline: "none",
  };

  const buttonStyle = {
    border: "none",
    borderRadius: "11px",
    padding: "12px 18px",
    background: "#8b7bea",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: busy ? "wait" : "pointer",
    opacity: busy ? 0.7 : 1,
  };

  function renderPasswordToggle(show, onToggle, label) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        style={{
          position: "absolute",
          insetInlineEnd: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          border: 0,
          padding: 0,
          background: "transparent",
          color: colors.muted,
          cursor: "pointer",
        }}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    );
  }

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "grid",
        placeItems: "center",
        padding: "20px",
        background: "rgba(10, 12, 20, 0.55)",
        backdropFilter: "blur(5px)",
      }}
    >
      <div
        dir={isPersian ? "rtl" : "ltr"}
        style={{
          width: "100%",
          maxWidth: "410px",
          boxSizing: "border-box",
          padding: "27px",
          borderRadius: "21px",
          background: colors.background,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          boxShadow: "0 25px 80px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              width: "49px",
              height: "49px",
              display: "grid",
              placeItems: "center",
              borderRadius: "15px",
              background: isDarkMode ? "#39334f" : "#f0edff",
              color: "#8b7bea",
            }}
          >
            {isCreateMode ? (
              <ShieldCheck size={25} />
            ) : (
              <LockKeyhole size={25} />
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={isPersian ? "بستن" : "Close"}
            style={{
              border: 0,
              background: "transparent",
              color: colors.muted,
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        <h2 style={{ fontSize: "20px", margin: "0 0 9px" }}>
          {isCreateMode
            ? isPersian
              ? "قفل کردن یادداشت"
              : "Lock this note"
            : isPersian
              ? "باز کردن یادداشت خصوصی"
              : "Unlock private note"}
        </h2>

        <p
          style={{
            color: colors.muted,
            fontSize: "13px",
            lineHeight: 1.9,
            margin: "0 0 23px",
          }}
        >
          {noteTitle
            ? `${isPersian ? "یادداشت:" : "Note:"} ${noteTitle}`
            : isCreateMode
              ? isPersian
                ? "برای رمزنگاری و محافظت از محتوای یادداشت، یک رمز عبور انتخاب کن."
                : "Choose a password to encrypt and protect this note."
              : isPersian
                ? "برای مشاهده محتوای این یادداشت، رمز عبور را وارد کن."
                : "Enter your password to view this note."}
        </p>

        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "9px",
            }}
          >
            {isPersian ? "رمز عبور" : "Password"}
          </label>

          <div style={{ position: "relative", marginBottom: "17px" }}>
            <input
              autoFocus
              required
              minLength={4}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={
                isPersian ? "رمز عبور را وارد کن" : "Enter password"
              }
              autoComplete="new-password"
              style={{
                ...inputStyle,
                paddingInlineEnd: "43px",
              }}
            />

            {renderPasswordToggle(
              showPassword,
              () => setShowPassword((value) => !value),
              isPersian ? "نمایش رمز اصلی" : "Show password"
            )}
          </div>

          {isCreateMode && (
            <>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "9px",
                }}
              >
                {isPersian ? "تکرار رمز عبور" : "Confirm password"}
              </label>

              <div style={{ position: "relative", marginBottom: "17px" }}>
                <input
                  required
                  minLength={4}
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder={
                    isPersian
                      ? "رمز عبور را دوباره وارد کن"
                      : "Confirm your password"
                  }
                  autoComplete="new-password"
                  style={{
                    ...inputStyle,
                    paddingInlineEnd: "43px",
                  }}
                />

                {renderPasswordToggle(
                  showConfirmPassword,
                  () => setShowConfirmPassword((value) => !value),
                  isPersian
                    ? "نمایش تکرار رمز عبور"
                    : "Show confirm password"
                )}
              </div>
            </>
          )}

          {(localError || error) && (
            <p
              role="alert"
              style={{
                color: "#dc6579",
                fontSize: "12px",
                margin: "0 0 15px",
              }}
            >
              {localError || error}
            </p>
          )}

          {isCreateMode && (
            <p
              style={{
                color: colors.muted,
                fontSize: "11px",
                lineHeight: 1.8,
                margin: "0 0 17px",
              }}
            >
              {isPersian
                ? "هشدار: اگر رمز را فراموش کنی، محتوای رمزنگاری‌شده قابل بازیابی نیست."
                : "Warning: If you forget your password, the encrypted content cannot be recovered."}
            </p>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              disabled={busy}
              style={{ ...buttonStyle, flex: 1 }}
            >
              {busy
                ? isPersian
                  ? "لطفاً صبر کن..."
                  : "Please wait..."
                : isCreateMode
                  ? isPersian
                    ? "ایجاد قفل"
                    : "Create lock"
                  : isPersian
                    ? "باز کردن یادداشت"
                    : "Unlock note"}
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                border: `1px solid ${colors.border}`,
                borderRadius: "11px",
                padding: "12px 16px",
                background: "transparent",
                color: colors.muted,
                cursor: "pointer",
              }}
            >
              {isPersian ? "انصراف" : "Cancel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrivateNoteDialog;
