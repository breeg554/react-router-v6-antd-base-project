import { lazyImport } from "../utils/lazyImport";

import { AuthRoutes } from "../features/auth";
// const { AuthRoutes } = lazyImport(() => import("../features/auth"), "AuthRoutes");

export const publicRoutes = [...AuthRoutes];
