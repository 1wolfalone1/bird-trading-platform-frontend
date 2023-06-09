import clsx from "clsx";
import s from "./resetPassword.module.scss";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Style from "../../../style/inline-style/style";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../api/server/API";
import { useNavigate } from "react-router-dom";
import { persistSliceSelector } from "../../../redux/global/persistSlice";
import { LoadingButton } from "@mui/lab";

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

const cssButton = {
  textTransform: "none",
  fontSize: "3rem",
  width: "100%",
  padding: "0.5rem",
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
  const params = new URLSearchParams(window.location.search); // id=123
  const dispatch = useDispatch();
  const { emailTemp } = useSelector(persistSliceSelector);
  const { verifyId } = useSelector(persistSliceSelector);
  const { code } = useSelector(persistSliceSelector);
  const navigate = useNavigate();
  const [changePasswordStatus, setChangePasswordStatus] = useState(false);
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
      email: emailTemp,
      verifyId: parseInt(verifyId),
      code: parseInt(code.join("")),
      newPassword: values.password,
    };
    console.log(payload);
    try {
      setLoading(true);
      const response = await api.put("/users/reset-password", payload);
      setLoading(false);
      const data = await response.data;
      if (data.successCode == 200) {
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
      setChangePasswordStatus(true);
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
      }
    } catch (err) {
      setChangePasswordStatus(true);
    }
  };

  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.title)}>Reset Password</div>
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
        <div className={clsx(s.errorText)}>
          {changePasswordStatus && <span>Something went wrong!</span>}
        </div>
        <div className={clsx(s.submitBtn)}>
          <LoadingButton
            variant="outlined"
            fullWidth
            loading={loading}
            type="submit"
            color="Accent7"
            sx={cssButton}
          >
            Submit
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
