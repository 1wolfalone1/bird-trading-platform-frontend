import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import s from "./verifyCode.module.scss";
import { Button, TextField } from "@mui/material";
import { api } from "../../../api/server/API";
import { useNavigate } from "react-router-dom";

export default function VerifyCode({ close }) {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [verificationCodeStatus, setVerificationCodeStatus] = useState();

  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    setVerificationCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;

      return newCode;
    });

    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && verificationCode[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };
  const formHelperText = {
    style: {
      fontSize: "1.6rem",
      color: "red",
      marginLeft: "0px",
    },
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      handleSubmitBtn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitBtn = async () => {
    // check the verify code
    // success => navigate("/reset-password");
    // failed => warning
    navigate("/reset-password");
  };

  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.header)}>
        <div className={clsx(s.title)}>Enter Verification Code</div>
        <div className={clsx(s.closeButton)}>
          <button onClick={close}>&times;</button>
        </div>
      </div>
      <form onSubmit={onFormSubmit} className={clsx(s.content)}>
        <div className={clsx(s.code)}>
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              className={clsx(s.codeInput)}
              type="tel"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <div className={clsx(s.errorText)}>
          {verificationCodeStatus ? <span>{verificationCodeStatus}</span> : ""}
        </div>
        <div className={clsx(s.submitBtn)}>
          <Button
            onClick={handleSubmitBtn}
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
