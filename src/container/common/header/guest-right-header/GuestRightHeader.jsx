import React from "react";
import s from "./guestRightHeader.module.scss";
import LoginIcon from "../../../../asset/icons/Login";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Style from "../../../../style/inline-style/style";
import CartItemsPopper from "../../../../component/popper/cart-popper/CartItemsPopper";
import SignupIcon from "../../../../asset/icons/Signup";
const buttonLogin = {
  textTransform: "none",
  fontFamily: Style.font.$Secondary,
  color: Style.color.$Dominant1,
  fontSize: "2.4rem",
  fontWeight: 100,
  lineHeight: "100%",
  padding: "1rem 2.4rem",
  "&.MuiButton-outlined": {
    border: "1px solid " + Style.color.$Dominant1,
  },
  borderRadius: 35,
};
export default function GuestRightHeader({ totalCartItems }) {
  const navigate = useNavigate();
  return (
    <div className={s.navRight}>
      <Button
        variant="outlined"
        sx={buttonLogin}
        onClick={() => {
          navigate("/login");
        }}
      >
        Sign in <LoginIcon className={s.icon} />
      </Button>
      <Button
        variant="outlined"
        sx={buttonLogin}
        onClick={() => {
          navigate("sign-up");
        }}
      >
        Sign up <SignupIcon className={s.icon} />
      </Button>
      <CartItemsPopper totalCartItems={totalCartItems} />
    </div>
  );
}
