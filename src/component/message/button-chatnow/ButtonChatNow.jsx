import { IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userInfoSelector,
  userStatus,
} from "../../../redux/global/userInfoSlice";
import AddToCartToast, { toastType } from "../../toast/content/AddToCartToast";
import messageSlice, { getListMessage } from "../messageSlice";
import { toast } from "react-toastify";

const ButtonChatNow = ({ ButtonOrIcon, shop, css, text }) => {
  const { status } = useSelector(userInfoSelector);
  const dispatch = useDispatch();

  const handleChatNow = (shop) => {
    if (status === userStatus.USER) {
      const updateShop = {
        ...shop,
        unread: 0,
      };
      console.log("shop ne", updateShop);
      dispatch(messageSlice.actions.addShopIntoUserList({ shop: updateShop }));
      dispatch(messageSlice.actions.setOpenPopup({ isOpen: true }));
      dispatch(
        messageSlice.actions.setCurrentShopIDSelect({ shopID: shop.id })
      );
      dispatch(getListMessage(shop.id));
    } else {
      toast(
        <AddToCartToast
          type={toastType.WARNING_INPUT}
          msg={"You must Sign in to perform this function!"}
        />,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        }
      );
    }
  };
  return (
    <IconButton onClick={() => handleChatNow(shop)}>
      <ButtonOrIcon sx={css}>{text}</ButtonOrIcon>
    </IconButton>
  );
};

export default ButtonChatNow;
