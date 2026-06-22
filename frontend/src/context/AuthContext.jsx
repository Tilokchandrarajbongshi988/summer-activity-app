import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getMe = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include"
      });

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    getMe(); //  RUNS WHEN APP LOADS
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, getMe }}>
      {children}
    </AuthContext.Provider>
  );
};