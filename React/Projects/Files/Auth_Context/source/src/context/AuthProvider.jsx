import { useEffect, useState } from "react";
import AuthContext from "./auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch("https://sabzlearn.ir/api/auth/me", {
    //   method: "POST",
    // });

    setUser({ id: 1, username: "محمدامین سعیدی راد" });
  }, []);

  const login = () => {
    // Login Api
    // fetch("https://sabzlearn.ir/api/auth/login", {
    //   method: "POST",
    // });

    setUser({ id: 1, username: "محمدامین سعیدی راد" });
  };

  const logout = () => {
    // Logout Api
    // fetch("https://sabzlearn.ir/api/auth/logout");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
