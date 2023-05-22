import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

import s from './layout.module.scss'
import { Outlet } from "react-router-dom";
export default function Layout() {
   return (
      <>
         <Header/>
         <div>
            <Outlet/>
         </div>
         <Footer/>
      </>
   );
}
