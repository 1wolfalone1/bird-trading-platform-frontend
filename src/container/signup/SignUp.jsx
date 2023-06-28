import clsx from "clsx";
import s from "./signUp.module.scss";
import React, { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import Style from "../../style/inline-style/style";
import { Link } from "react-router-dom";
import ButtonGoogle from "../../component/buttonGoogle/ButtonGoogle";
import * as yup from "yup";
import { useFormik } from "formik";
import { registerAPI } from "../../api/server/RegisterAPI";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
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
  fontSize: "3rem",
  width: "100%",
  padding: "1rem",
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
export default function SignUp() {
  const [signUpWithGoogle, setSignUpWithGoogle] = useState();
  const [isVerifyProcess, setIsVerifyProcess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState("");

  const onFormSubmit = async (e) => {
    try {
      console.log(e);
      e.preventDefault();
      handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

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
        confirmPassword: "Confirm password is not match!",
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
    <>
      <div className={clsx(s.container)}>
        <motion.div
          initial={{
            x: "-100%",
          }}
          animate={{
            x: 0,
            transition: {
              duration: 0.5,
            },
          }}
          className={clsx(s.imgLeft)}
        >
          <img
            src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/signUp.png"
            alt="Sign up"
          />
        </motion.div>
        <div className={clsx(s.contentRight)}>
          <div className={clsx(s.title)}>
            <span>Create Account</span>
          </div>
          <form onSubmit={onFormSubmit} className={clsx(s.inputContainer)}>
            <div className={clsx(s.inputText)}>
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
            </div>
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
                Sign up
              </LoadingButton>
            </div>
          </form>
          <div className={clsx(s.separate)}>
            <span>Or</span>
          </div>
          <div>
            <ButtonGoogle content={"Sign up with Google"} />
            <div className={clsx(s.helpGooleText)}></div>
          </div>
          <div className={clsx(s.linkBottom)}>
            Already have an account?{" "}
            <Link to="/login" className={clsx(s.link)}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
