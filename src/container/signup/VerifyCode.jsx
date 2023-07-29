import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import s from "./verifyCode.module.scss";
import { Button } from "@mui/material";
import { api } from "../../api/server/API";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import persistSlice, {
  persistSliceSelector,
} from "../../redux/global/persistSlice";
import { LoadingButton } from "@mui/lab";

export default function VerifyCode({ close }) {
  const { emailTemp } = useSelector(persistSliceSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [verificationCodeStatus, setVerificationCodeStatus] = useState(false);

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
    try {
      setLoading(true);
      const response = await api.get("/users/verify/register", {
        params: {
          code: verificationCode.join(""),
          email: emailTemp,
        },
      });
      setLoading(false);
      const data = await response.data;
      console.log(data);
      const verifyId = data.match(/Id: (\d+)/)[1];
      console.log(verifyId);
      if (response.status == 200) {
        dispatch(persistSlice.actions.saveCode(verificationCode));
        dispatch(persistSlice.actions.saveVerifyId(verifyId));
        navigate("/login");
      }
    } catch (err) {
      setVerificationCodeStatus(true);
    }
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
          {verificationCodeStatus && <span>Invalid code!</span>}
        </div>
        <div className={clsx(s.submitBtn)}>
          <LoadingButton
            variant="outlined"
            color="Accent7"
            fullWidth
            loading={loading}
            type="submit"
          >
            Next
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
