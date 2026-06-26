import { useCallback, useEffect, useState } from "react";
import { logout as logoutRequest } from "../services/authService";
import useCampStore from "../zustand/useCampStore";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const clearCampStore = useCampStore((state) => state.clearCampStore);

  const getMe = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setUser(null);
        return;
      }

      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {
      setUser(null);
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
