/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useState } from "react";
import { logout as logoutRequest } from "../services/authService";
import useCampStore from "../zustand/useCampStore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const clearCampStore = useCampStore((state) => state.clearCampStore);

  const getMe = useCallback(async () => {
    try {
      console.log("calling /me");

      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include"
      });

      const data = await res.json();
      console.log("ME RESPONSE", data)

      if (!res.ok) {
        setUser(null);
        return;
      }

      setUser(data.user);
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
      clearCampStore();
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      await getMe();
    };

    loadUser();
  }, [getMe]);

  return (
    <AuthContext.Provider value={{ user, setUser, getMe, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
