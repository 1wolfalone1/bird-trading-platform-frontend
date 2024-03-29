import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import clsx from "clsx";
import React from "react";
import s from "./footer.module.scss";

const iconStyle = {
  fontSize: '5.4rem'
}
export default function Footer() {
   return (
      <div className={clsx(s.container)}>
         <div className={clsx(s.infoText)}>
            <span className={clsx(s.title)}>Customer services</span>
            <span className={clsx(s.info)}>Help center</span>
            <span className={clsx(s.info)}>Report abuse</span>
            <span className={clsx(s.info)}>Policies</span>
            <span className={clsx(s.info)}>Get paid for your feed back</span>
         </div>
         <div className={clsx(s.infoText)}>
            <span className={clsx(s.title)}>About us</span>
            <span className={clsx(s.info)}>About BirdStore2nd.com</span>
            <span className={clsx(s.info)}>Abount GOF Group</span>
            <span className={clsx(s.info)}>Legal Notice</span>
         </div>
         <div className={clsx(s.contactUs)}>
            <span>Contact us via</span>
            <div className={clsx(s.logoContainer)}>
               <FacebookIcon sx={iconStyle}/>
               <InstagramIcon sx={iconStyle}/>
               <GitHubIcon sx={iconStyle}/>
            </div>
         </div>
         <div className={clsx(s.logo)}>
            <img src={'https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/logo%3Ddark.svg'} alt="logo" />
         </div>
      </div>
   );
}
