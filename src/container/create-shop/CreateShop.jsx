import clsx from "clsx";
import s from "./createShop.module.scss";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Style from "../../style/inline-style/style";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import ButtonGoogle from "../../component/buttonGoogle/ButtonGoogle";
import * as yup from "yup";
import { useFormik } from "formik";
import { registerAPI } from "../../api/server/RegisterAPI";
import { LoadingButton } from "@mui/lab";

const textFieldStyle = {
  input: {
    color: Style.color.$Complementary0,
    fontSize: "1.8rem",
    fontFamily: Style.font.$Primary,
  },
  label: {
    fontSize: "1.8rem",
  },
  ".MuiOutlinedInput-notchedOutline legend": {
    fontSize: "1.5rem",
  },
};

const buttonRegisterStyle = {
  textTransform: "none",
  fontSize: "2.4rem",
  width: "100%",
  padding: "15.rem 1rem",
};
const formHelperText = {
  style: {
    fontSize: "1.6rem",
    color: "red",
    marginLeft: "0px",
  },
};
const validationSchema = yup.object({
  email: yup
    .string("")
    .email("Enter a valid email address")
    .required("Email is required!"),
  name: yup.string("").required("Name is required!"),
  phone: yup
    .string()
    .matches(/^(?!\D)/, "Phone number is not valid!")
    .required("Phone number is required!"),
  password: yup.string("").required("Password is required!"),
  confirmPassword: yup.string("").required("Confirm password is required!"),
});
export default function CreateShop() {
  const [signUpWithGoogle, setSignUpWithGoogle] = useState();
  const [isVerifyProcess, setIsVerifyProcess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState("");
  const form = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      matchPassword: "",
    },
    initialErrors: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      matchPassword: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });
  const handleSubmit = async () => {
    console.log(form.values);
    const e = await form.validateForm(form.values);
    form.setTouched(
      {
        email: true,
        name: true,
        address: true,
        phone: true,
        password: true,
        confirmPassword: true,
      },
      false
    );

    if (form.values.password !== form.values.confirmPassword) {
      form.setErrors({
        ...e,
        confirmPassword: "Confirm password not match!",
      });
    } else {
      form.setErrors({
        ...e,
      });
    }
    if (form.isValid) {
      console.log(form.values);
      postRegister(form.values);
    }
  };
  const postRegister = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
      phoneNumber: values.phone,
      matchingPassword: values.confirmPassword,
      fullName: values.name,
    };
    try {
      setLoading(true);
      const response = await registerAPI.post("", payload);
      setLoading(false);
      setEmailConfirm(response.data);
      setIsVerifyProcess(true);
    } catch (e) {
      console.log(e);
      if (e.response.status === 406) {
        form.setErrors({ ...form.errors, email: "Email already exists!" });
      }
    }
  };
  console.log(form.errors);
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.imgLeft)}>
        <img
          src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/signUp.png"
          alt="Create Shop Account"
        />
      </div>
      <div className={clsx(s.contentRight)}>
        <div className={clsx(s.title)}>
          <span>Create Shop Account</span>
        </div>
        <Grid container spacing={1} className={clsx(s.inputContainer)}>
          <Grid sm={4} md={4} xl={4} className={clsx(s.title)}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              color="Dominant0"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.email && Boolean(form.errors.email)}
              helperText={form.touched.email && form.errors.email}
              FormHelperTextProps={formHelperText}
              sx={textFieldStyle}
              fullWidth
            />
          </Grid>
          <Grid sm={4} md={4} xl={4} className={clsx(s.title)}>
            <TextField
              id="name"
              label="Full Name"
              variant="outlined"
              color="Dominant0"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.name && Boolean(form.errors.name)}
              helperText={form.touched.name && form.errors.name}
              sx={textFieldStyle}
              FormHelperTextProps={formHelperText}
              fullWidth
            />
          </Grid>
          <Grid sm={4} md={4} xl={4} className={clsx(s.title)}>
            <TextField
              id="phone"
              label="Phone Number"
              variant="outlined"
              color="Dominant0"
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.phone && Boolean(form.errors.phone)}
              helperText={form.touched.phone && form.errors.phone}
              sx={textFieldStyle}
              FormHelperTextProps={formHelperText}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} className={clsx(s.info)}>
          <Grid sm={6} md={6} xl={6} className={clsx(s.title)}>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              color="Dominant0"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.password && Boolean(form.errors.password)}
              helperText={form.touched.password && form.errors.password}
              sx={textFieldStyle}
              FormHelperTextProps={formHelperText}
              fullWidth
            />
          </Grid>
          <Grid sm={6} md={6} xl={6} className={clsx(s.title)}>
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              color="Dominant0"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={
                form.touched.confirmPassword &&
                Boolean(form.errors.confirmPassword)
              }
              helperText={
                form.touched.confirmPassword && form.errors.confirmPassword
              }
              FormHelperTextProps={formHelperText}
              sx={textFieldStyle}
              fullWidth
            />
          </Grid>
        </Grid>
        <div className={clsx(s.button)}>
          <LoadingButton
            sx={buttonRegisterStyle}
            variant="outlined"
            color="Accent7"
            fullWidth
            loading={loading}
            type="button"
            onClick={handleSubmit}
          >
            Create Account
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
