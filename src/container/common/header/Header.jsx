import s from "./header.module.scss";
import logo from "../../../asset/logo=light.svg";
import {
   Badge,
   Box,
   MenuItem,
   Select,
   Tab,
   Tabs,
} from "@mui/material";
import Style from "./../../../style/inline-style/style";
import clsx from "clsx";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCartShopping,
   faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { totalItemsSelector, userStatus } from "../../order/cartSlice";
import GuestRightHeader from "./guest-right-header/GuestRightHeader";
import { userInfoSelector } from "./../../../redux/global/userInfoSlice";
import UserRightHeader from "./user-right-header/UserRightHeader";
import { toast } from "react-toastify";
import { useState } from "react";
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
   const [age, setAge] = useState("10");
   const [value, setValue] = useState("1");
   const totalCartItems = useSelector(totalItemsSelector);

   const user = useSelector(userInfoSelector);
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
         {user.status === userStatus.USER ? (
            <UserRightHeader user={user}  totalCartItems={totalCartItems} />
         ) : (
            <GuestRightHeader totalCartItems={totalCartItems} />
         )}
      </div>
   );
}
