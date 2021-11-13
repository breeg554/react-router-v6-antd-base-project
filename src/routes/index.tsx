import { useRoutes } from "react-router-dom";

import { Landing, NotFound } from "../features/common";
import { useAuth } from "../providers/auth";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [
    { path: "/", element: <Landing /> },
    { path: "*", element: <NotFound /> },
  ];

  const routes = auth.currentUser ? protectedRoutes : [];

  const element = useRoutes([...routes, ...publicRoutes, ...commonRoutes]);

  return <>{element}</>;
};
