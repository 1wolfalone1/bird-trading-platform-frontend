import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

import s from "./layout.module.scss";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { Backdrop, CircularProgress, createTheme } from "@mui/material";
import Style from "../../../style/inline-style/style";
import { ThemeProvider } from "@emotion/react";
import { red } from "@mui/material/colors";
import ToastCustom from "../../../component/toast/ToastCustom";
import PopupMessage from "../../../component/message/PopupMessage";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import { backDropSelector } from "../../../redux/global/globalConfigSlice";
const theme = createTheme({
  palette: {

    Complementary: {
      main: "#5e5e5e",
    },
    Dominant0: {
      main: "rgb(32, 72, 1)",
    },
    Dominant1: {
      main: "rgb(205, 255, 166)",
    },
    Dominant2: {
      main: "rgb(228, 223, 209)",
    },
    Dominant3: {
      main: "rgb(255, 235, 235)",
    },
    Dominant4: {
      main: "rgb(255, 255, 255)",
    },
    Dominant5: {
      main: "rgb(205, 255, 166)",
    },
    Accent7: {
      main: "rgb(4, 0, 30)",
      contrastText: "rgb(205, 255, 166)",
    },
    Accent8: {
      main: "rgb(14, 10, 35)",
      contrastText: "rgb(205, 255, 166)",
    },
    Accent1: {
      main: "rgb(178, 223, 255)",
      contrastText: "rgb(4, 0, 30)",
    },
  },

  overrides: {
    MuiMenuItem: {
      // For ListItem, change this to MuiListItem
      root: {
        "&$selected": {
          // this is to refer to the prop provided by M-UI
          backgroundColor: "black",
        },
        $paper: {
          color: "red",
        },
      },
    },
  },
});

export default function Layout() {

   const openBackDrop = useSelector(backDropSelector);
   return (
      <>
         <ThemeProvider theme={theme}>
            <Header />
            <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackDrop}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
            <div className={clsx(s.content)}>
               <div className={clsx(s.extraSpace)}></div>
               <Outlet />
            </div>
            <ToastCustom/>
            <PopupMessage/>
            <Footer />
         </ThemeProvider>
      </>
   );
}
