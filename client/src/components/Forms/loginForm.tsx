import { withModalHolder } from "../../utils/modalHolder";
import { memo } from "react";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import Modalnput from "../FormInput";
import { ModalBottom, ModalForm } from "./Forms.styled";
import LoadingButton from "../LoadingButton";
import { useFormik } from "formik";
import { loginBody } from "../../schema/login";
import { VITE_REACT_BACKEND_URL } from "../../config/env";

const initialValues = {
  loginEmail: "",
  loginPassword: "",
};

const LoginModal = () => {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    isSubmitting,
    setFieldError,
  } = useFormik({
    initialValues,
    validationSchema: loginBody(),
    onSubmit: async (e) => {
      const body = { email: e.loginEmail, password: e.loginPassword };
      try {
        const res = await fetch(`${VITE_REACT_BACKEND_URL}/api/auth`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (res.status === 401) {
          setFieldError("loginEmail", "Wrong credential");
          setFieldError("loginPassword", "Wrong credential");
          return;
        }
        if (res.status === 202) {
          // return;
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <ModalForm onSubmit={handleSubmit}>
        <Modalnput
          id="loginEmail"
          name="loginEmail"
          placeholder="Enter your email"
          type="email"
          icon={<EmailIcon />}
          value={values.loginEmail}
          blur={handleBlur}
          change={handleChange}
          error={errors.loginEmail}
          touched={touched.loginEmail}
        />
        <Modalnput
          id="loginPassword"
          name="loginPassword"
          placeholder="Enter your password"
          icon={<KeyIcon />}
          value={values.loginPassword}
          blur={handleBlur}
          change={handleChange}
          error={errors.loginPassword}
          touched={touched.loginPassword}
          isPassword
        />
        <ModalBottom>
          <span>Forgot password ?</span>
          <LoadingButton
            isLoading={isSubmitting}
            color="var(--bluish)"
            text="Sign In"
            type="submit"
          />
        </ModalBottom>
      </ModalForm>
    </>
  );
};

export default withModalHolder(memo(LoginModal), "Sign In");
