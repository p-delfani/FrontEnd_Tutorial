import { memo, useState } from "react";

const Name = ({ name, setName }) => {
  const [theme, setTheme] = useState("light");
  // Context - useContext

  console.log(`[Name.jsx] Re-Rendered`);

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={theme === "light" ? "light-mode" : "dark-mode"}
      />
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        تغییر تم
      </button>
    </>
  );
};

export default memo(Name); // Props
