import {
   Badge,
   Box,
   Fade,
   IconButton,
   Popover,
   Popper,
   Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import s from "./cartItemsPopper.module.scss";
import clsx from "clsx";
import CartIcon from "../../../asset/icons/Cart";
import { getListItemSelector } from "../../../container/order/cartSlice";
import { useSelector } from "react-redux";
import CartItemInPopper from "./cartItemInPopper/CartItemInPopper";
export default function CartItemsPopper({ totalCartItems }) {
   const [anchorEl, setAnchorEl] = useState();
   const cartItems = useSelector(getListItemSelector);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);
   const id = open ? "simple-popover" : undefined;
   console.log(cartItems);
   return (
      <>
         <IconButton
            aria-describedby={id}
            color="Dominant1"
            position="relative"
            onClick={handleClick}
         >
            <Badge
               badgeContent={totalCartItems}
               color="Accent1"
               sx={{}}
               max={10}
               overlap="circular"
            >
               <CartIcon className={s.cartIcon} />
            </Badge>
         </IconButton>
         <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            disableScrollLock={true}
            placement="bottom"
            marginTopThreshold={10}
            className={clsx(s.popover)}
            
         >
            {cartItems.length !== 0 ? (
               <>
               <div className={s.titleCartItem}>
                  <span>Your cart</span>
                  <div></div>
               </div>
               <div className={s.itemContainer}>
                  {cartItems.map((item) => (
                     <CartItemInPopper item={item} key={item.id} />
                     ))}
               </div>
                     </>
            ) : (
               ""
            )}
         </Popover>
      </>
   );
}
