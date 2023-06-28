import clsx from "clsx";
import s from "./resetPassword.module.scss";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Style from "../../../style/inline-style/style";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../../api/server/API";
import { useNavigate } from "react-router-dom";

const textFieldStyle = {
  input: {
    color: Style.color.$Complementary0,
    fontSize: "2rem",
    fontFamily: Style.font.$Primary,
  },
  label: {
    fontSize: "2rem",
  },
  ".MuiOutlinedInput-notchedOutline legend": {
    fontSize: "1.5rem",
  },
};

const buttonLoginStyle = {
  textTransform: "none",
  fontSize: "3.2rem",
  width: "80%",
};
const formHelperText = {
  style: {
    fontSize: "1.6rem",
    color: "red",
    marginLeft: "0px",
  },
};
const validationSchema = yup.object({
  password: yup
    .string("")
    .min(8, "Password must be at least 8 characters!")
    .required("Password is required!"),
  confirmPassword: yup.string("").required("Confirm password is required!"),
});
export default function ResetPassword({ close }) {
  const [loginGoogleStatus, setLoginGoogleStatus] = useState();
  const [loginEmailPasswordStatus, setLoginEmailPasswordStatus] = useState();
  const params = new URLSearchParams(window.location.search); // id=123
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      handleChangePassword();
    } catch (error) {
      console.error(error);
    }
  };

  const form = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    initialErrors: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const changePassword = async (values) => {
    const payload = {
      password: values.password,
      matchingPassword: values.confirmPassword,
    };
    try {
      setLoading(true);
      const response = await api.post("", payload);
      setLoading(false);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePassword = async () => {
    try {
      const e = await form.validateForm(form.values);
      form.setTouched(
        {
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
        changePassword(form.values);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.header)}>
        <div className={clsx(s.title)}>Reset Password</div>
        <div className={clsx(s.closeButton)}>
          <button onClick={close}>&times;</button>
        </div>
      </div>
      <form onSubmit={onFormSubmit} className={clsx(s.inputContainer)}>
        <div className={clsx(s.inputText)}>
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            color="Dominant0"
            value={form.values?.password ? form.values.password : ""}
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
            value={
              form.values?.confirmPassword ? form.values.confirmPassword : ""
            }
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

        <div className={clsx(s.submitBtn)}>
          <Button
            onClick={handleChangePassword}
            type="submit"
            variant="outlined"
            fullWidth
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
