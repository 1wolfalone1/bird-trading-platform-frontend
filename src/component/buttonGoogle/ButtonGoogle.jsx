import React from "react";
import googleLogo from "../../asset/Google svg.svg";
import clsx from "clsx";
import s from "./ButtonGoole.module.scss";
import RippleButton from "../button/ripple-button/RippleButton";
import { URI_FRONTEND, URI_LOCAL_FRONTEND } from "../../config/constant";

export default function ButtonGoogle({ content, onClick }) {
   return (
      <a
         href={`https://thongtienthienphuot.shop/oauth2/authorize/google?redirect_uri=${URI_LOCAL_FRONTEND}/get-token`}
         alt="dsfafasdfasdf"
         style={{ display: "flex", justifyContent: "center" }}
      >
         <RippleButton onClick={onClick} className={clsx(s.buttonContainer)}>
            <span>{content}</span>
            <img src={googleLogo} alt="" />
         </RippleButton>
      </a>
   );
}
