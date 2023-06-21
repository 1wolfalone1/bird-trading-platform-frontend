import clsx from "clsx";
import s from "./login.module.scss";
import React, { useState } from "react";
import img from "../../asset/leftImagLogin.jpg";
import { Button, TextField } from "@mui/material";
import Style from "../../style/inline-style/style";
import ButtonGoogle from "./../../component/buttonGoogle/ButtonGoogle";
import { Link, useNavigate } from "react-router-dom";
import { authenticateAPI } from "../../api/server/AuthenticatonAPI";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import userInfoSlice from "../../redux/global/userInfoSlice";
import { userStatus } from "../order/cartSlice";
import { api } from "./../../api/server/API";
import { errorAuthentication } from "../../config/constant";
import { motion } from 'framer-motion';

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
  email: yup
    .string("")
    .email("Enter a valid email address")
    .required("Email is required!"),
  password: yup
    .string("")
    .min(8, "Password must be at least 8 characters!")
    .required("Password is required!"),
});
export default function Login() {
  const [loginGoogleStatus, setLoginGoogleStatus] = useState();
  const [loginEmailPasswordStatus, setLoginEmailPasswordStatus] = useState();

  const params = new URLSearchParams(window.location.search); // id=123
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    initialErrors: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });
  useEffect(() => {
    let error = params.get("error");
    if (error == errorAuthentication.CONFLICT_GOOGLE_LOGIN) {
      setLoginGoogleStatus(
        "The email you provided is already registered in our system!"
      );
    }
  }, []);
  const handleLogin = async () => {
    try {
      const e = await form.validateForm(form.values);
      form.setTouched(
        {
          email: true,
          password: true,
        },
        true
      );
      if (form.isValid) {
        const response = await authenticateAPI.post("", {
          email: form.values.email,
          password: form.values.password,
        });
        const data = await response.data;
        handleLoginResponseData(data, response.status);
      }
    } catch (err) {
      const data = await err.response;
      console.log(err);
      if (data.status === 401) {
        setLoginEmailPasswordStatus("Invalid email or password!");
      }
    }
  };

  const handleLoginResponseData = (data, status) => {
    console.log(data, "111");
    if (status == 200) {
      localStorage.setItem("token", JSON.stringify(data.token));
      dispatch(
        userInfoSlice.actions.changeAuthentication({
          status: userStatus.USER,
          info: data.userInfo,
        })
      );
      callCookies();
      navigate("/products");
    } else if (status === 404) {
      console.log(status)
    }
  };
  const callCookies = async () => {
    try {
      const response = await api.get("/users/get-cookie");
      const data = await response.data;
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={clsx(s.container)}>
      <motion.div
        initial={{
          x: '-100%'
        }}
        animate={{
          x: 0,
          transition: {
            duration: 0.5,
          }
        }}
      className={clsx(s.imgLeft)}>
        <img
          src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/login.png"
          alt="Login"
        />
        
      </motion.div>
      <div className={clsx(s.contentRight)}>
        <div className={clsx(s.title)}>
          <span>Sign in</span>
        </div>
        <div className={clsx(s.inputContainer)}>
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
              FormHelperTextProps={formHelperText}
              sx={textFieldStyle}
              fullWidth
            />
          </div>

          <div className={clsx(s.button)}>
            <Button
              sx={buttonLoginStyle}
              variant="outlined"
              fullWidth
              color="Accent7"
              onClick={handleLogin}
            >
              Sign in
            </Button>
            <div className={clsx(s.helpGooleText)}>
              {loginEmailPasswordStatus ? (
                <span>{loginEmailPasswordStatus}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className={clsx(s.separate)}>
          <span>Or</span>
        </div>
        <div>
          <ButtonGoogle content={"Sign in with Google"} onClick={() => {}} />

          <div className={clsx(s.helpGooleText)}>
            {loginGoogleStatus ? (
              <span>{loginGoogleStatus}</span>
            ) : (
              loginGoogleStatus
            )}
          </div>
        </div>
        <div className={clsx(s.linkBottom)}>
          Don't have an account yet?{" "}
          <Link to="/sign-up" className={clsx(s.link)}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
