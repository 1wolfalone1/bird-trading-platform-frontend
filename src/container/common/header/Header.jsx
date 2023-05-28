import React from "react";
import s from "./header.module.scss";
import logo from "../../../asset/logo=light.svg";
import {
   Button,
   FormControl,
   IconButton,
   InputBase,
   MenuItem,
   Select,
   alpha,
} from "@mui/material";
import Style from "./../../../style/inline-style/style";
import clsx from "clsx";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCartShopping,
   faMagnifyingGlass,
   faRightToBracket,
   faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginIcon from "../../../asset/icons/Login";
import SignupIcon from "../../../asset/icons/Signup";
import CartIcon from "./../../../asset/icons/Cart";
import { useNavigate } from "react-router-dom";
library.add(faCartShopping);
const buttonStyle = {
   fontSize: "3.8rem",
   color: Style.color.$Dominant1,
   fontFamily: Style.font.$Secondary,
   fontWeight: 100,
   padding: "1.5rem 1rem",
   lineHeight: "100%",
   textTransform: "none",
};

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
export default function Header() {
   const navigate = useNavigate();
   const [age, setAge] = React.useState("10");

   const handleChange = (e) => {
      setAge(e.target.value);
   };
   return (
      <div className={s.container}>
         <div className={s.logo}>
            <img src={logo} alt="logo" />
         </div>
         <div className={s.navLeft}>
            <div className={clsx(s.navCover, s.active)}>
               <Button
                  variant="text"
                  sx={buttonStyle}
                  size="small"
                  onClick={() => {
                     navigate("/");
                  }}
               >
                  Home
               </Button>
            </div>
            <div className={s.navCover}>
               <Button
                  variant="text"
                  sx={buttonStyle}
                  onClick={() => {
                     navigate("/products");
                  }}
               >
                  Products
               </Button>
            </div>
         </div>
         <div className={s.searchBar}>
            <input
               type="text"
               placeholder="Search product here"
               className={clsx(s.searchInput)}
            />
            <div className={clsx(s.filter)}>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                  sx={{ fontSize: "2.4rem", height: "4rem" }}
                  MenuProps={{
                     disableScrollLock: true,
                     style: {
                        color: "white",
                     },
                  }}
               >
                  <MenuItem value={10} sx={{ fontSize: "2.4rem" }}>
                     Ten
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "2.4rem" }}>
                     Twenty
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: "2.4rem" }}>
                     Thirty
                  </MenuItem>
               </Select>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                  sx={{ fontSize: "2.4rem", height: "4rem" }}
                  MenuProps={{
                     disableScrollLock: true,
                     style: {
                        color: Style.color.$Dominant1,
                     },
                  }}
                  
               >
                  <MenuItem value={10} sx={{ fontSize: "2.4rem" }} >
                     Ten
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "2.4rem" }}>
                     Twenty
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: "2.4rem" }}>
                     Thirty
                  </MenuItem>
               </Select>
               <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={clsx(s.icon)}
               />
            </div>
         </div>
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
                  navigate("/signup");
               }}
            >
               Sign up <SignupIcon className={s.icon} />
            </Button>
            <IconButton color="Dominant1">
               <CartIcon className={s.cartIcon} />
            </IconButton>
         </div>
      </div>
   );
}
