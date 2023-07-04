import React from "react";
import clsx from "clsx";
import s from "./orderHistory.module.scss";
import { FormControl, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import { getCartSelector } from "../../order/cartSlice";
import StatusNavbar from "../../../component/purchase/order-status/header/status/StatusNavbar";
import Action from "../../../component/purchase/order-status/header/action/Action";
import Products from "../../../component/checkout/products/Products";
import { useEffect } from "react";
import { useState } from "react";
import { userInfoSelector } from "../../../redux/global/userInfoSlice";
import { useJsApiLoader } from "@react-google-maps/api";
import { ArrowDropDown } from "@mui/icons-material";

export default function OrderHistory() {
  const [listShopOwnersItems, setListShopOwnersItems] = useState([]);
  const { items, voucherSelected } = useSelector(getCartSelector);
  const userInfo = useSelector(userInfoSelector);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const lib = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_API}`,
    libraries: lib,
  });

  useEffect(() => {
    setDeliveryInfo({
      fullName: userInfo.info.fullName,
      phoneNumber: userInfo.info.phoneNumber,
      address: userInfo.info.address,
    });
  }, [userInfo]);

  useEffect(() => {
    const listTemp = items.reduce((acc, item) => {
      let count = 0;
      acc.map((lists) => {
        if (lists.id === item.shopOwner.id) {
          count++;
          return lists.data.push(item);
        } else {
          return lists;
        }
      });
      if (count === 0) {
        acc.push({ id: item.shopOwner.id, data: [item] });
      }
      return acc;
    }, []);
    setListShopOwnersItems(listTemp);
  }, []);

  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.packageOrder)}>
        {listShopOwnersItems
          ? listShopOwnersItems.map((lists) => (
              <div className={clsx(s.order)}>
                <StatusNavbar />
                <Products
                  products={lists.data}
                  key={lists.id}
                  deliveryInfo={deliveryInfo}
                  isLoaded={isLoaded}
                />
                <Action />
              </div>
            ))
          : ""}
      </div>
      {/* <div className={clsx(s.productContainer)}>
        <div className={clsx(s.deliveryAddress)}></div>
        <div className={clsx(s.productInfo)}></div>
        <div className={clsx(s.totalPrice)}></div>
      </div> */}
    </div>
  );
}
