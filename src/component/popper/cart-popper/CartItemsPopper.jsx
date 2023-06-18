import {
  Badge,
  Box,
  Button,
  Fade,
  IconButton,
  Popover,
  Popper,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import s from "./cartItemsPopper.module.scss";
import clsx from "clsx";
import CartIcon from "../../../asset/icons/Cart";
import { getListItemSelector } from "../../../container/order/cartSlice";
import { useSelector } from "react-redux";
import CartItemInPopper from "./cartItemInPopper/CartItemInPopper";
import { useNavigate } from "react-router-dom";
export default function CartItemsPopper({ totalCartItems, setValue }) {
  const [anchorEl, setAnchorEl] = useState();
  const cartItems = useSelector(getListItemSelector);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
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
        className={clsx(s.popover)}
      >
        {cartItems && cartItems.length !== 0 ? (
          <>
            <div>
              <div className={s.container}>
                <div className={s.titleCartItem}>
                  <span>Your cart</span>
                  <div></div>
                </div>
                <div className={s.itemContainer}>
                  {cartItems.map((item, id) => {
                    return (
                      <Fragment key={item.id}>
                        {id === 0 ? (
                          <CartItemInPopper item={item} key={item.id} />
                        ) : (
                          <CartItemInPopper
                            item={item}
                            key={item.id}
                            className={s.divider}
                          />
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              </div>
              <div className={s.button}>
                <Button
                  sx={{ fontSize: "3rem" }}
                  color="Accent1"
                  fullWidth
                  onClick={() => {
                    navigate("/cart");
                    handleClose();
                  }}
                >
                  Order now
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className={s.emptyCart}>
            <h1>Your cart is empty</h1>
            <img
              src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/assetImage/asset/image/empty-cart2.svg"
              alt=""
            />
          </div>
        )}
      </Popover>
    </>
  );
}
