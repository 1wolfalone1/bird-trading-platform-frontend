import { Box, Button, Switch, TextField, Typography } from "@mui/material";
import clsx from "clsx";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authenticateAPI } from "../../api/server/AuthenticatonAPI";
import { errorAuthentication } from "../../config/constant";
import userInfoSlice from "../../redux/global/userInfoSlice";
import Style from "../../style/inline-style/style";
import { userStatus } from "../order/cartSlice";
import { api } from "./../../api/server/API";
import ButtonGoogle from "./../../component/buttonGoogle/ButtonGoogle";
import s from "./login.module.scss";
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

const buttonLoginStyle = {
  textTransform: "none",
  fontSize: "3rem",
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
const validationSchemaStaff = yup.object({
  shopId: yup.string("").required("Shop ID is required!"),
  username: yup.string("").required("Username is required!"),
  password: yup
    .string("")
    .min(8, "Password must be at least 8 characters!")
    .required("Password is required!"),
});
export default function Login() {
  const [loginGoogleStatus, setLoginGoogleStatus] = useState();
  const [loginEmailPasswordStatus, setLoginEmailPasswordStatus] = useState();
  const [isSignInStaff, setIsSignInStaff] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(window.location.search); // id=123
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      handleLogin();
    } catch (error) {
      console.error(error);
    }
  };

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
  const formStaff = useFormik({
    initialValues: {
      shopId: "",
      username: "",
      password: "",
    },
    initialErrors: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaStaff,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async () => {
      try {
        const res = await api.post("/staffs/authenticate", formStaff.values);
        const data = await res.data;
        console.log(data);
        window.location.href = `${process.env.REACT_APP_REDIRECT_ADMIN}get-token?role=${data.role}&token=${data.token.accessToken}`;
      } catch (e) {
        if (e?.response?.status === 401) {
          setLoginEmailPasswordStatus("Invalid username or password!");
        }
        console.log(e);
      }
    },
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
        setLoading(true);
        const response = await authenticateAPI.post("", {
          email: form.values.email,
          password: form.values.password,
        });
        setLoading(false);
        const data = await response.data;
        console.log(data);
        if (data.role === 4) {
          window.location.href = `${process.env.REACT_APP_REDIRECT_ADMIN}get-token?role=${data.role}&token=${data.token.accessToken}`;
        } else {
          handleLoginResponseData(data, response.status);
        }
      }
    } catch (err) {
      setLoading(false);
      const data = await err.response;
      console.log(err);
      if (data.status === 401) {
        setLoginEmailPasswordStatus("Incorrect email or password!");
      }
      if (data.status === 404) {
        console.log(data.status);
        setLoginEmailPasswordStatus("Unverified account!");
      }
    }
  };

  const handleLoginResponseData = (data, status) => {
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
      console.log(status);
      setLoginEmailPasswordStatus("Unverified account!");
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

  const handleSubmit = () => {
    navigate("/forgot-password");
  };

  return (
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
          src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/login.png"
          alt="Login"
        />
      </motion.div>
      <div className={clsx(s.contentRight)}>
        <div className={clsx(s.title)}>
          <span>Sign in</span>
        </div>
        {isSignInStaff ? (
          <>
            <form
              onSubmit={formStaff.handleSubmit}
              className={clsx(s.inputContainer)}
            >
              <div className={clsx(s.inputText)}>
                <TextField
                  id="shopId"
                  label="Shop ID"
                  variant="outlined"
                  color="Dominant0"
                  value={formStaff.values.shopId}
                  onChange={formStaff.handleChange}
                  onBlur={formStaff.handleBlur}
                  error={
                    formStaff.touched.shopId && Boolean(formStaff.errors.shopId)
                  }
                  helperText={
                    formStaff.touched.shopId && formStaff.errors.shopId
                  }
                  FormHelperTextProps={formHelperText}
                  sx={textFieldStyle}
                />
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  color="Dominant0"
                  value={formStaff.values.username}
                  onChange={formStaff.handleChange}
                  onBlur={formStaff.handleBlur}
                  error={
                    formStaff.touched.username &&
                    Boolean(formStaff.errors.username)
                  }
                  helperText={
                    formStaff.touched.username && formStaff.errors.username
                  }
                  FormHelperTextProps={formHelperText}
                  sx={textFieldStyle}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  color="Dominant0"
                  value={formStaff.values.password}
                  onChange={formStaff.handleChange}
                  onBlur={formStaff.handleBlur}
                  error={
                    formStaff.touched.password &&
                    Boolean(formStaff.errors.password)
                  }
                  helperText={
                    formStaff.touched.password && formStaff.errors.password
                  }
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
                  type="submit"
                >
                  Sign in
                </Button>
                <div className={clsx(s.helpGooleText)}>
                  {loginEmailPasswordStatus ? (
                    <span>{loginEmailPasswordStatus}</span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </form>
          </>
        ) : (
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
              <LoadingButton
                sx={buttonLoginStyle}
                variant="outlined"
                fullWidth
                color="Accent7"
                loading={loading}
                onClick={handleLogin}
                type="submit"
              >
                Sign in
              </LoadingButton>
              <div className={clsx(s.helpGooleText)}>
                {loginEmailPasswordStatus ? (
                  <span>{loginEmailPasswordStatus}</span>
                ) : (
                  <></>
                )}
              </div>
              <div className={clsx(s.separate)}>
                <span>Or</span>
              </div>
              <div>
                <ButtonGoogle
                  content={"Sign in with Google"}
                  onClick={() => {}}
                />

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
              <div className={clsx(s.forgotPassword)}>
                <Button onClick={handleSubmit}>Forgot Password?</Button>
              </div>
            </div>
          </form>
        )}
        {/* <div className={clsx(s.separate)}>
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
        </div> */}
        <Box display="flex" alignItems="end">
          <Typography
            sx={{ fontSize: "2.4rem", textAlign: "center", paddingTop: "1rem" }}
          >
            Sign in as staff?
          </Typography>
          <Switch
            checked={isSignInStaff}
            onChange={(e) => {
              console.log(e.target.checked);
              setIsSignInStaff(e.target.checked);
            }}
            color="success"
            size="medium"
          />{" "}
        </Box>
        {/* <div className={clsx(s.linkBottom)}>
          Don't have an account yet?{" "}
          <Link to="/sign-up" className={clsx(s.link)}>
            Sign Up
          </Link>
        </div>
        <div className={clsx(s.forgotPassword)}>
          <Button onClick={handleSubmit}>Forgot Password?</Button>
        </div> */}
      </div>
    </div>
  );
}
