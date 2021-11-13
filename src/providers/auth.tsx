import React, { createContext, useContext, useState, useEffect } from "react";

import { User } from "../types";
import { logout } from "../features/auth/api/logout";
import api from "../lib/axios";
import { message, Spin } from "antd";
import { queryClient } from "../lib/react-query";

interface AuthContextTypes {
  loading: boolean;
  currentUser: User | null;
  setCurrentUser: (data: any) => void;
  getUser: () => any;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextTypes>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any | null>("null");

  const getUser = () => {
    setLoading(true);
    return api
      .get(`/auth`)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleLogout = async () => {
    try {
      // await logout();
      setCurrentUser(null);
      queryClient.clear();
      message.success("Zostałeś wylogowany");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{ loading, currentUser, setCurrentUser, getUser, handleLogout }}
    >
      {loading ? <Spin /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
