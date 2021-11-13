import { useState } from "react";
import * as Yup from "yup";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginWithEmailAndPassword } from "../api/login";
import { FormValues } from "../types";
import { useAuth } from "../../../providers/auth";
import { Link } from "react-router-dom";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Niepoprawny email").required("Pole obowiązkowe"),
  password: Yup.string()
    .min(6, "Minimum 6 znaków!")
    .max(100, "Minimum 100 znaków!")
    .required("Pole obowiązkowe"),
});

interface LoginFormProps {}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const LoginForm: React.FC<LoginFormProps> = () => {
  const { setCurrentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: FormValues, actions: any) => {
    setLoading(true);
    try {
      // const user = await loginWithEmailAndPassword({ ...values });
      setCurrentUser("user");
      setLoading(false);

      // history.push("/");
    } catch (err: any) {
      setLoading(false);
      console.log(err.response);
      if (err.response) {
        if (err.response.status === 404)
          return actions.setFieldError("email", "Nie ma takiego użytkownika");
        if (err.response.status === 400)
          return actions.setFieldError("password", "Błędne hasło");
        if (err.response.status === 403)
          return actions.setFieldError("password", "Konto zablokowane");
      }
      actions.setFieldError("password", "Coś poszło nie tak!");
    }
  };

  return (
    <Formik
      // validationSchema={SignInSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, errors, touched }) => (
        <FormikForm className="signin__form">
          <Form.Item label="Email">
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email ? (
              <Typography.Text type="danger" style={{ fontSize: "12px" }}>
                {errors.email}
              </Typography.Text>
            ) : null}
          </Form.Item>

          <Form.Item label="Hasło">
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              name="password"
              placeholder="Hasło"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && touched.password ? (
              <Typography.Text type="danger" style={{ fontSize: "12px" }}>
                {errors.password}
              </Typography.Text>
            ) : null}
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Zapamietaj mnie</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="/zapomnialem-hasla">
              Zapomniałem hasła
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={loading}
              loading={loading}
            >
              Zaloguj
            </Button>
            lub <Link to="/rejestracja">Zarejestruj się!</Link>
          </Form.Item>
        </FormikForm>
      )}
    </Formik>
  );
};

export default LoginForm;
