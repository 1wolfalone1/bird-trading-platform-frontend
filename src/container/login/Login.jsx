import clsx from "clsx";
import s from "./login.module.scss";
import React, { useState } from "react";
import img from "../../asset/leftImagLogin.jpg";
import { Button, TextField } from "@mui/material";
import Style from "../../style/inline-style/style";
import ButtonGoogle from "./../../component/buttonGoogle/ButtonGoogle";
import { Link } from "react-router-dom";
const textFieldStyle = {
  input: {
    color: Style.color.$Complementary0,
    fontSize: "2.4rem",
    fontFamily: Style.font.$Primary,
  },
  label: {
    fontSize: "2.4rem",
  },
};
const buttonLoginStyle = {
  textTransform: "none",
  fontSize: "2.4rem",
  width: "80%",
};
export default function Login() {
  const [loginGoogleStatus, setLoginGoogleStatus] = useState();

  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.imgLeft)}>
        <img src={img} alt="" />
      </div>
      <div className={clsx(s.contentRight)}>
        <div className={clsx(s.title)}>
          <span>Sign in</span>
        </div>
        <div className={clsx(s.inputContainer)}>
          <div className={clsx(s.inputText)}>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              color="Dominant0"
              sx={textFieldStyle}
            />
            <TextField
              id="filled-basic"
              label="Password"
              type="password"
              variant="filled"
              color="Dominant0"
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
            >
              Login
            </Button>
          </div>
        </div>
        <div className={clsx(s.separate)}>
          <span>Or</span>
        </div>
        <div>
          <ButtonGoogle content={"Sign in with Google"} />
          <div className={clsx(s.helpGooleText)}>
            {loginGoogleStatus ? (
              ""
            ) : (
              <span>Sign in by Google failed! Try again</span>
            )}
          </div>
        </div>
        <div className={clsx(s.linkBottom)}>
          Don't have an account yet?{" "}
          <Link to="/signup" className={clsx(s.link)}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
