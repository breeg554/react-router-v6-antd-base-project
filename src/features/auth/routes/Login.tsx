import { Typography } from "antd";

import LoginForm from "../components/LoginForm";
interface LoginProps {}
export const Login: React.FC<LoginProps> = () => {
  return (
    <>
      <Typography.Title level={1} style={{ fontSize: "30px", marginBottom: "24px" }}>
        Zaloguj się na swoje konto
      </Typography.Title>
      <LoginForm />
    </>
  );
};
