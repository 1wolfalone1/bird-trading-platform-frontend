import clsx from "clsx";
import s from "./signUp.module.scss";
import React, { useState } from "react";
import img from "../../asset/leftImgRegistration.jpg";
import { Button, TextField } from "@mui/material";
import Style from "../../style/inline-style/style";
import { Link } from "react-router-dom";
import ButtonGoogle from "../../component/buttonGoogle/ButtonGoogle";

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

const buttonRegisterStyle = {
  textTransform: "none",
  fontSize: "3rem",
  width: "100%",
  padding: "1rem",
};

export default function SignUp() {
  const [signUpWithGoogle, setSignUpWithGoogle] = useState();


  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.imgLeft)}>
        <img src={img} alt="" />
      </div>
      <div className={clsx(s.contentRight)}>
        <div className={clsx(s.title)}>
          <span>Create Account</span>
        </div>
        <div className={clsx(s.inputContainer)}>
          <div className={clsx(s.inputText)}>
            <TextField
              id="filled-basic"
              label="Email address"
              variant="filled"
              color="Dominant0"
              sx={textFieldStyle}
              fullWidth
            />
            <TextField
              id="filled-basic"
              label="Phone"
              variant="filled"
              color="Dominant0"
              sx={textFieldStyle}
              fullWidth
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
            <TextField
              id="filled-basic"
              label="Confirm password"
              type="password"
              variant="filled"
              color="Dominant0"
              sx={textFieldStyle}
              fullWidth
            />
          </div>
          <div className={clsx(s.button)}>
            <Button
              sx={buttonRegisterStyle}
              variant="outlined"
              color="Accent7"
              fullWidth
            >
              Sign up
            </Button>
          </div>
        </div>
        <div className={clsx(s.separate)}>
          <span>Or</span>
        </div>
        <div>
               <ButtonGoogle content={"Sign up with Google"} />
               <div className={clsx(s.helpGooleText)}>
                  {signUpWithGoogle ? (
                     ""
                  ) : (
                     <span>Sign in by Google failed! Try again</span>
                  )}
               </div>
            </div>
        <div className={clsx(s.linkBottom)}>
          Already have an account?{" "}
          <Link to="/login" className={clsx(s.link)}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
