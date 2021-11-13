import { Route, Routes } from "react-router-dom";

import { Login } from "./Login";
import { Register } from "./Register";

export const AuthRoutes = [
  { path: "/logowanie", element: <Login /> },
  { path: "/rejestracja", element: <Register /> },
];

// export const AuthRoutes = () => {
//   return (
//     <Routes>
//       <Route path="rejestracja" element={<Register />} />
//       <Route path="logowanie" element={<Login />} />
//     </Routes>
//   );
// };
