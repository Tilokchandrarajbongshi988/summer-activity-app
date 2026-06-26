import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      console.log("calling /me");

      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include"
      });

      const data = await res.json();
      console.log("ME RESPONSE", data)
      setUser(data.user);
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe(); //  RUNS WHEN APP LOADS
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, getMe, loading, }}>
      {children}
    </AuthContext.Provider>
  );
};