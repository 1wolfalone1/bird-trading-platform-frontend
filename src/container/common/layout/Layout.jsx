import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

import s from './layout.module.scss'
import { Outlet } from "react-router-dom";
import clsx from "clsx";
export default function Layout() {
   return (
      <>
         <Header/>
         <div className={clsx(s.content)}>
            <div className={clsx(s.extraSpace)}>
            </div>
            <Outlet/>
         </div>
         <Footer/>
      </>
   );
}
