import React from "react";
import googleLogo from "../../asset/Google svg.svg";
import clsx from "clsx";
import s from "./ButtonGoole.module.scss";
import RippleButton from "../button/ripple-button/RippleButton";

export default function ButtonGoogle({ content, onClick }) {
   return (
      <RippleButton onClick={onClick} className={clsx(s.buttonContainer)}>
            <span>{content}</span>
            <img src={googleLogo} alt="" />
      </RippleButton>
   );
}
