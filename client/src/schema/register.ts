import * as Yup from "yup";
import { states } from "../data/address";

export const registerBody = () => {
  return Yup.object({
    firstName: Yup.string()
      .min(3, "Firstname must be at least 3 characters")
      .required("Please enter your firstname"),
    lastName: Yup.string()
      .min(3, "Lastname must be at least 3 characters")
      .required("Please enter your lastname"),
    email: Yup.string()
      .matches(/^([a-zA-Z0-9.-]+)@gmail.com$/, "Invalid email address")
      .required("Please enter your email"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Other"], "Invalid gender")
      .required("Please select your gender"),
    mobile: Yup.string()
      .matches(/^[6-9]([0-9]){9}$/, "Invalid mobile no.")
      .required("Please enter your mobile"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .matches(/[a-z]/, "Password must includes a small letter")
      .matches(/[A-Z]/, "Password must includes a capital letter")
      .matches(/[0-9]/, "Password must includes a number")
      .matches(/[^\w]/, "Password must includes a symbol")
      .required("Please enter your password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Both password must be same")
      .required("Please confirm your password"),
    state: Yup.string()
      .oneOf([...states.map((e) => e.state)], "Invalid state")
      .required("Please enter your state"),
    city: Yup.string()
      .test({
        name: "valid-city",
        test: (val, ctx) => {
          const cities = states.filter((e) => e.state === ctx.parent?.state)[0]
            .districts;
          if (cities && cities.length && cities.includes(String(val), 0)) {
            return true;
          } else {
            ctx.createError({
              message: "Enter a valid city",
              path: "city",
            });
          }
        },
      })
      .required("Please enter your city"),
    street: Yup.string().required("Please enter your street"),
    zip: Yup.string()
      .matches(/^[1-9]([0-9]){5}$/, "Invalid pin code")
      .required("Please enter your pin code"),
  });
};
