import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import ThemeContext from "../Contexts/Theme";

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log(`[ThemeButton.jsx] Re-Render`);

  return (
    <button className="cursor-pointer" onClick={toggleTheme}>
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeButton;
