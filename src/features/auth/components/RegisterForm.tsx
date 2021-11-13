import { useState } from "react";
import * as Yup from "yup";
import { Form, Input, Button, Typography, message } from "antd";
import { Formik, Form as FormikForm } from "formik";
import { registerWithEmailAndPassword } from "../api/register";
import { useAuth } from "../../../providers/auth";
import { FormValues } from "../types";
import { Link } from "react-router-dom";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Niepoprawny email").required("Pole obowiązkowe"),
  password: Yup.string()
    .min(6, "Minimum 6 znaków!")
    .max(100, "Maximum 100 znaków!")
    .required("Pole obowiązkowe"),
  name: Yup.string()
    .min(2, "Minimum 2 znaki!")
    .max(100, "Maximum 100 znaków!")
    .required("Pole obowiązkowe"),
  surname: Yup.string()
    .min(2, "Minimum 2 znaki!")
    .max(100, "Maximum 100 znaków!")
    .required("Pole obowiązkowe"),
  username: Yup.string()
    .min(3, "Minimum 3 znaki!")
    .max(20, "Maximum 20 znaków!")
    .required("Pole obowiązkowe"),
});

interface RegisterFormProps {}

const initialValues: FormValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  username: "",
};

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const { getUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: FormValues, actions: any) => {
    setLoading(true);
    try {
      await registerWithEmailAndPassword({ ...values });
      message.success("Rejestracja pomyślna! Możesz się zalogować");

      // history.push("/logowanie");
    } catch (err: any) {
      setLoading(false);
      console.log(err.response);
      // if (err && err.code) {
      //   if (err.code === "auth/user-not-found") actions.setFieldError("email", "Nie ma takiego użytkownika");
      //   else actions.setFieldError("email", err.code);
      // } else {
      //   actions.setFieldError("email", err.code);
      // }
      if (err.response) {
        actions.setFieldError("password", err.response.status);
      }
    }
  };

  return (
    <Formik
      validationSchema={SignInSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, errors, touched }) => (
        <FormikForm className="signup__form">
          <Form.Item label="Imię">
            <Input
              placeholder="Imię"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && touched.name ? (
              <Typography.Text type="danger" style={{ fontSize: "12px" }}>
                {errors.name}
              </Typography.Text>
            ) : null}
          </Form.Item>
          <Form.Item label="Nazwisko">
            <Input
              placeholder="Nazwisko"
              name="surname"
              value={values.surname}
              onChange={handleChange}
            />
            {errors.surname && touched.surname ? (
              <Typography.Text type="danger" style={{ fontSize: "12px" }}>
                {errors.surname}
              </Typography.Text>
            ) : null}
          </Form.Item>
          <Form.Item label="Nazwa użytkownika">
            <Input
              placeholder="Nazwa użytkownika"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && touched.username ? (
              <Typography.Text type="danger" style={{ fontSize: "12px" }}>
                {errors.username}
              </Typography.Text>
            ) : null}
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="email"
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={loading}
              loading={loading}
            >
              Zarejestruj się
            </Button>
            <Link to="/logowanie">Masz już konto?</Link>
          </Form.Item>
        </FormikForm>
      )}
    </Formik>
  );
};

export default RegisterForm;
