import { useEffect } from "react";
import s from "./userRightHeader.module.scss";
import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Style from "../../../../style/inline-style/style";
import CartItemsPopper from "../../../../component/popper/cart-popper/CartItemsPopper";
import { motion } from "framer-motion";
import { Box, Divider, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faAddressCard,
   faArrowRightFromBracket,
   faShop,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userInfoSlice, { logout } from "../../../../redux/global/userInfoSlice";
import NotiItemsPopper from "../../../../component/popper/noti-poper/NotiItemsPopper";
import { api } from "../../../../api/server/API";

const menuItemStyle = {
   width: "20rem",
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
};
const typoItemMenu = {
   fontSize: "2.4rem",
   fontWeight: "1",
   color: Style.color.$Accent1,
};
export default function UserRightHeader({ user, totalCartItems }) {
   const [isActive, setIsActive] = React.useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const dispatch = useDispatch();
   const open = Boolean(anchorEl);
   const navigate = useNavigate();
   const handleLogout = () => {
      dispatch(logout());
      setAnchorEl(null);
      navigate("/");
   };
   const handleClose = (link) => {
      return () => {
         setIsActive(!isActive);
         setAnchorEl(null);
         if (link) {
            navigate(link);
         }
      };
   };
   useEffect(() => {
      if (user.imgUrl) {
      } else {
      }
   }, []);
   const handleUserControlClick = (event) => {
      setIsActive(!isActive);

      setAnchorEl(event.currentTarget);
   };
   const IconRefComponent = React.forwardRef((props, ref) => (
      <ArrowDropDownIcon
         ref={ref}
         sx={{ fontSize: "4rem", color: Style.color.$Accent1 }}
      />
   ));
   const IconDropDown = motion(IconRefComponent);
   const iconRotateAnimation = {
      animate: {
         rotateX: isActive ? 180 : 0,
         transition: {
            duration: 0.2,
            type: "spring",
         },
      },
   };
   const handleNavigateToShop = async () => {
      try {
         const res = await api.get('/shop-owner/redirect');
         const data = await res.data;
         console.log(data);
         if (data.successMessage) {
            window.location.href = data.successMessage; // Redirect to the desired page
         }
      } catch (e) {

         const error = e.response.data
         if(error.errorCode === "400") {
            navigate("/create-shop")
         }
         console.log(e);
      }
   };
   return (
      <>
         <div className={s.container}>
            <div
               className={s.userControl}
               onClick={handleUserControlClick}
               id="basic-button"
               aria-controls={open ? "basic-menu" : undefined}
               aria-haspopup="true"
               aria-expanded={open ? "true" : undefined}
            >
               <div className={s.avatar}>
                  <img
                     src={
                        user?.info && user.info?.imgUrl
                           ? user?.info?.imgUrl
                           : "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                     }
                     alt=""
                  />
               </div>
               <div className={s.userName}>
                  <span>{user?.info?.fullName}</span>
               </div>
               <IconDropDown variants={iconRotateAnimation} animate="animate" />
            </div>
            <Menu
               id="basic-menu"
               anchorEl={anchorEl}
               disableScrollLock={true}
               open={open}
               onClose={handleClose()}
               transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
               }}
               className={clsx(s.menuUserControl)}
               MenuListProps={{
                  "aria-labelledby": "basic-button",
               }}
            >
               <MenuItem onClick={handleClose("/profile")}>
                  <Box sx={menuItemStyle}>
                     <Typography sx={typoItemMenu}>Profile</Typography>
                     <FontAwesomeIcon
                        icon={faAddressCard}
                        className={s.iconMenu}
                     />
                  </Box>
               </MenuItem>
               <Divider className={clsx(s.divider)} />
               <MenuItem onClick={handleNavigateToShop}>
                  <Box sx={menuItemStyle}>
                     <Typography sx={typoItemMenu}>Your shop</Typography>
                     <FontAwesomeIcon icon={faShop} className={s.iconMenu} />
                  </Box>
               </MenuItem>
               <Divider className={clsx(s.divider)} />
               <MenuItem onClick={handleLogout}>
                  <Box sx={menuItemStyle}>
                     <Typography sx={typoItemMenu}>Logout</Typography>
                     <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className={s.iconMenu}
                     />
                  </Box>
               </MenuItem>
            </Menu>
            <NotiItemsPopper />
            <CartItemsPopper totalCartItems={totalCartItems} />
         </div>
      </>
   );
}
