import { ChangeEvent, memo, useCallback, useRef, useState } from "react";
import { withModalHolder } from "../../utils/modalHolder";
import { ModalForm, ModalInputGroup } from "./Forms.styled";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";
import PhoneIcon from "@mui/icons-material/Phone";
import KeyIcon from "@mui/icons-material/Key";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { states } from "../../data/address";
import Modalnput from "../FormInput";
import ImageUploader from "../ImageUploader";
import { useFormik } from "formik";
import { registerBody } from "../../schema/register";
import { VITE_REACT_BACKEND_URL } from "../../config/env";
import LoadingButton from "../LoadingButton";
import swal from "sweetalert";

interface registerData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  userType: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  state: "",
  city: "",
  street: "",
  zip: "",
};

const SignupModal = () => {
  const profileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<any>(null);
  const [districts, setDistricts] = useState<string[] | null>(null);

  const changeImage = useCallback(() => {
    if (profileRef.current?.files) {
      const reader = new FileReader();
      reader.readAsDataURL(profileRef.current.files[0]);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  }, [profileRef]);
  const addressStateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setFieldValue("state", value);
    const cities = states.filter((e) => e.state === value)[0];
    cities && setDistricts(cities.districts);
  }, []);

  const {
    handleSubmit,
    setFieldValue,
    errors,
    handleChange,
    handleBlur,
    values,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: registerBody(),
    onSubmit: async (e, helper) => {
      const newData: registerData = {
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        gender: e.gender.toLowerCase(),
        mobile: e.mobile,
        userType: "student",
        password: e.password,
        confirmPassword: e.confirmPassword,
        address: {
          street: e.street,
          city: e.city,
          state: e.state,
          zip: e.zip,
        },
      };

      try {
        const res = await fetch(`${VITE_REACT_BACKEND_URL}/api/user`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newData),
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 409) {
          return;
        }
        helper.resetForm();
        if (profileRef.current?.files?.length && image) {
          const formData = new FormData();
          formData.append("profile", profileRef.current?.files[0]);

          await fetch(`${VITE_REACT_BACKEND_URL}/api/user`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${data.data.accesstoken}`,
            },
            body: formData,
          });
        }
        swal({});
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <ModalForm onSubmit={handleSubmit}>
        <ModalInputGroup>
          <ModalInputGroup style={{ flexDirection: "column" }}>
            <Modalnput
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={values.firstName}
              type="text"
              icon={<PersonIcon />}
              change={handleChange}
              blur={handleBlur}
              error={errors.firstName}
              touched={touched.firstName}
            />
            <Modalnput
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={values.lastName}
              type="text"
              icon={<PersonIcon />}
              change={handleChange}
              blur={handleBlur}
              error={errors.lastName}
              touched={touched.lastName}
            />
            <Modalnput
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={values.email}
              icon={<EmailIcon />}
              change={handleChange}
              blur={handleBlur}
              error={errors.email}
              touched={touched.email}
            />
          </ModalInputGroup>
          <ImageUploader id="profile" profile={image} />
        </ModalInputGroup>

        <ModalInputGroup>
          <Modalnput
            id="gender"
            name="gender"
            placeholder="Select your gender"
            value={values.gender}
            icon={<WcIcon />}
            isSelect={true}
            selectOptions={["Male", "Female", "Other"]}
            change={handleChange}
            blur={handleBlur}
            error={errors.gender}
            touched={touched.gender}
          />

          <Modalnput
            id="mobile"
            name="mobile"
            placeholder="Mobile no."
            value={values.mobile}
            type="text"
            icon={<PhoneIcon />}
            change={handleChange}
            blur={handleBlur}
            error={errors.mobile}
            touched={touched.mobile}
          />
        </ModalInputGroup>

        <ModalInputGroup>
          <Modalnput
            id="password"
            name="password"
            placeholder="Password"
            value={values.password}
            icon={<KeyIcon />}
            change={handleChange}
            blur={handleBlur}
            error={errors.password}
            touched={touched.password}
            isPassword
          />
          <Modalnput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            icon={<KeyIcon />}
            change={handleChange}
            blur={handleBlur}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            isPassword
          />
        </ModalInputGroup>
        <Modalnput
          id="state"
          name="state"
          placeholder="Select your state"
          value={values.state}
          icon={<LocationCityIcon />}
          isSelect={true}
          selectOptions={states.map((e) => e.state)}
          change={addressStateChange}
          blur={handleBlur}
          error={errors.state}
          touched={touched.state}
        />

        <Modalnput
          id="city"
          name="city"
          placeholder="Select your city"
          value={values.city}
          icon={<LocationCityIcon />}
          isSelect={true}
          selectOptions={districts}
          change={handleChange}
          blur={handleBlur}
          error={errors.city}
          touched={touched.city}
        />

        <ModalInputGroup>
          <Modalnput
            id="street"
            name="street"
            placeholder="Street address"
            value={values.street}
            type="text"
            icon={<HomeIcon />}
            change={handleChange}
            blur={handleBlur}
            error={errors.street}
            touched={touched.street}
          />
          <Modalnput
            id="zip"
            name="zip"
            placeholder="Pin code"
            value={values.zip}
            type="text"
            icon={<FmdGoodIcon />}
            change={handleChange}
            blur={handleBlur}
            error={errors.zip}
            touched={touched.zip}
          />
        </ModalInputGroup>
        <LoadingButton
          isLoading={isSubmitting}
          color="var(--bluish)"
          text="Register"
          type="submit"
          width="100%"
        />
      </ModalForm>
      <input
        type="file"
        id="profile"
        name="profile"
        ref={profileRef}
        onChange={changeImage}
        hidden
      />
    </>
  );
};

export default withModalHolder(memo(SignupModal), "Join us");
