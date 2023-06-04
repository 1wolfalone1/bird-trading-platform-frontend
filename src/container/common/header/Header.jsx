import React, { useEffect } from "react";
import s from "./header.module.scss";
import logo from "../../../asset/logo=light.svg";
import {
   Badge,
   Box,
   Button,
   FormControl,
   IconButton,
   InputBase,
   MenuItem,
   Select,
   Tab,
   Tabs,
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
import { useSelector } from "react-redux";
import { totalItemsSelector } from "../../order/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
import { useState } from "react";
import CartItemsPopper from "./../../../component/popper/cart-popper/CartItemsPopper";
import GuestRightHeader from "./guestRightHeader/GuestRightHeader";
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



export default function Header() {
   const navigate = useNavigate();
   const [age, setAge] = React.useState("10");
   const [value, setValue] = React.useState("1");
   const totalCartItems = useSelector(totalItemsSelector);
   const [iconCartClick, setIconCartClick] = useState(false);
   const [isCartClick, setIsCartClick] = useState(false);
   const handleNavChange = (event, newValue) => {
      setValue(newValue);
      notifyAddtoCart();
   };
   const notifyAddtoCart = () =>
      toast("Add to cart successfully!", {
         position: toast.POSITION.BOTTOM_LEFT,
      });
   const handleChange = (e) => {
      setAge(e.target.value);
   };

   return (
      <div className={s.container}>
         <div className={s.logo}>
            <img src={logo} alt="logo" />
         </div>
         <div className={s.navLeft}>
            <Box sx={{ width: "100%" }}>
               <Tabs
                  value={value}
                  onChange={handleNavChange}
                  aria-label="wrapped label tabs example"
                  color="Dominant1"
                  className={clsx(s.tabs)}
                  TabIndicatorProps={{
                     sx: {
                        backgroundColor: Style.color.$Accent1,
                     },
                  }}
               >
                  <Tab value="1" label="Home" onClick={() => navigate("/")} />
                  <Tab
                     value="2"
                     label="Products"
                     onClick={() => navigate("/products")}
                  />
               </Tabs>
            </Box>
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
               <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={clsx(s.icon)}
               />
            </div>
         </div>
         <GuestRightHeader totalCartItems={totalCartItems}/>
      </div>
   );
}
