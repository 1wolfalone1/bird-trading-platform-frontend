import clsx from "clsx";
import s from "./login.module.scss";
import React from "react";
import img from "../../asset/leftImagLogin.jpg";
import { Button, TextField } from "@mui/material";

export default function Login() {
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
                  <TextField id="filled-basic" label="Email" variant="filled" />
                  <TextField
                     id="filled-basic"
                     label="Password"
                     type="password"
                     variant="filled"
                  />
               </div>
               <div className={clsx(s.button)}>
                  <Button>Login</Button>
               </div>
            </div>
            <div>
               <span></span>
            </div>
            <div className={clsx(s.buttonLoginGoogle)}></div>
            <div className={clsx(s.linkBottom)}></div>
         </div>
      </div>
   );
}
