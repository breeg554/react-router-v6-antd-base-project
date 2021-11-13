import { Spin } from "antd";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { lazyImport } from "../utils/lazyImport";

const { Dashboard } = lazyImport(() => import("../features/admin"), "Dashboard");

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <Spin />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export const protectedRoutes = [
  {
    path: "/admin",
    element: <App />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
