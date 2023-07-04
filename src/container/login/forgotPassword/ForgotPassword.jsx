import React, { useEffect, useState } from "react";
import clsx from "clsx";
import s from "./forgotPassword.module.scss";
import { Button, TextField } from "@mui/material";
import Style from "../../../style/inline-style/style";
import * as yup from "yup";
import { useFormik } from "formik";
import { api } from "../../../api/server/API";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import persistSlice from "../../../redux/global/persistSlice";

export default function ForgotPassword({ close, open, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      handleSubmitBtn();
    } catch (error) {
      console.error(error);
    }
  };
  const [forgotStatus, setForgotStatus] = useState(false);

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

  const validationSchema = yup.object({
    email: yup
      .string("")
      .email("Enter a valid email address")
      .required("Email is required!"),
  });

  const form = useFormik({
    initialValues: {
      email: "",
    },
    initialErrors: {
      email: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const formHelperText = {
    style: {
      fontSize: "1.6rem",
      color: "red",
      marginLeft: "0px",
    },
  };

  const handleSubmitBtn = async () => {
    try {
      const e = await form.validateForm(form.values);
      form.setTouched(
        {
          email: true,
        },
        true
      );
      if (form.isValid) {
        setLoading(true);
        const response = await api.put("/users/reset-password", {
          email: form.values.email,
        });
        setLoading(false);
        console.log("response", response);
        const data = await response.data;
        if (data.successCode == 200) {
          dispatch(persistSlice.actions.saveEmailTemp(form.values.email));
          navigate("/verify-code");
        }
      }
    } catch (err) {
      setForgotStatus(true);
    }
  };

  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.header)}>
        <div className={clsx(s.title)}>Input Your Email</div>
        <div className={clsx(s.closeButton)}>
          <button onClick={close}>&times;</button>
        </div>
      </div>
      <form onSubmit={onFormSubmit} className={clsx(s.content)}>
        <div className={clsx(s.email)}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            color="Dominant0"
            value={form.values?.email ? form.values.email : ""}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.email && Boolean(form.errors.email)}
            helperText={form.touched.email && form.errors.email}
            FormHelperTextProps={formHelperText}
            sx={textFieldStyle}
            fullWidth
          />
        </div>
        <div className={clsx(s.errorText)}>
          {forgotStatus && <span>Invalid email!</span>}
        </div>
        <div className={clsx(s.submitBtn)}>
          <Button
            type="submit"
            variant="outlined"
            fullWidth
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
