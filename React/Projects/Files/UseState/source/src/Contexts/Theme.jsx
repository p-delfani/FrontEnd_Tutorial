import { createContext, useEffect, useReducer, useState } from "react";

const ThemeContext = createContext();

const getDefaultTheme = () => {
  return localStorage.getItem("theme") || "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getDefaultTheme());
  // const [state, dispatch] = useReducer(reducer, "DEFAULT");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
