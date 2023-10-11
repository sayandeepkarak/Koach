import * as Yup from "yup";

export const loginBody = () => {
  return Yup.object({
    loginEmail: Yup.string()
      .matches(/^([a-zA-Z0-9.-]+)@gmail.com$/, "Invalid email address")
      .required("Please enter your email"),
    loginPassword: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("Please enter your password"),
  });
};
