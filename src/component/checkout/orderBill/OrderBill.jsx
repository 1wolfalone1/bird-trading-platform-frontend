import React, { useState } from "react";
import clsx from "clsx";
import s from "./orderBill.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import cartSlice, { getCartSelector } from "../../../container/order/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { userInfoSelector } from "../../../redux/global/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/server/API";
import { toast } from "react-toastify";
import AddToCartToast, { toastType } from "../../toast/content/AddToCartToast";
import { formatNumber } from "../../../utils/myUtils";

export default function OrderBill({ close, paymentType }) {
  const { items, voucherSelected } = useSelector(getCartSelector);
  const { info } = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let subTotal = Number(
    items.reduce(
      (total, item) => total + item.discountedPrice * item.cartQuantity,
      0
    )
  );

  let shipTotal = !voucherSelected.shipping ? Number(0.05 * subTotal) : 0;

  let promotion = voucherSelected.discount?.discount ?? 0;

  const handleSubmitBtn = () => {
    // Create a data object with the required payload
    const productOrder = items.reduce((acc, order) => {
      return { ...acc, [order.id]: order.cartQuantity };
    }, {});

    const promotionId = [];
    if (voucherSelected.shipping?.id) {
      promotionId.push(voucherSelected.shipping.id);
    }

    if (voucherSelected.discount?.id) {
      promotionId.push(voucherSelected.discount.id);
    }
    const totalPrice = () => {
      return subTotal + shipTotal - promotion > 0
        ? formatNumber(subTotal + shipTotal - promotion)
        : 0;
    };
    const data = {
      userOrderDto: {
        email: info.email,
        name: info.fullName,
        phoneNumber: info.phoneNumber,
        street: info.address.street,
        ward: info.address.ward,
        district: info.address.district,
        city: info.address.city,
      },
      transactionDto: {
        totalPrice: totalPrice(),
        promotionId: promotionId,
        paymentMethod: paymentType.toUpperCase(),
      },
      productOrder: productOrder,
    };

    api
      .post("/package-order", data)
      .then((response) => {
        // Handle the response from the backend, if needed
        if (paymentType === "PayPal") {
          if (response.data.successCode == 200) {
            window.location.href = response.data.successMessage.substring(10);
          }
        }
        if (paymentType === "Delivery") {
          if (response.data.successCode == 200) {
            dispatch(cartSlice.actions.removeCart());
            localStorage.removeItem("cart");
            navigate("/order-status");
          }
          if (response.data.errorCode == 406) {
          }
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        const errorMessage = "Order failed! Please check again!";
        const notifyAddtoCart = () =>
          toast(
            <AddToCartToast type={toastType.WARNING} msg={errorMessage} />,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            }
          );
        notifyAddtoCart();
        console.error(error);
      });
  };

  console.log(items);
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.header)}>
        <div className={clsx(s.title)}>Your bill</div>
        <div className={clsx(s.closeButton)}>
          <button onClick={close}>&times;</button>
        </div>
      </div>
      <div className={clsx(s.headerContainer)}>
        <Grid container columns={12} className={clsx(s.headerContent)}>
          <Grid sm={7} md={7} xl={7} className={clsx(s.headerName)}>
            Product Name
          </Grid>
          <Grid sm={2} md={2} xl={2} className={clsx(s.headerQuantity)}>
            Quantity
          </Grid>
          <Grid sm={3} md={3} xl={3} className={clsx(s.headerPrice)}>
            Price
          </Grid>
        </Grid>
      </div>
      <div className={clsx(s.billContainer)}>
        {items.map((item) => (
          <Grid className={clsx(s.billInfo)} key={item.id}>
            <Grid container columns={12} className={clsx(s.bill)}>
              <Grid sm={7} md={7} xl={7} className={clsx(s.name)}>
                {item.name}
              </Grid>
              <Grid sm={2} md={2} xl={2} className={clsx(s.quantity)}>
                {item.cartQuantity}
              </Grid>
              <Grid sm={3} md={3} xl={3} className={clsx(s.price)}>
                {formatNumber(item.discountedPrice * item.cartQuantity)}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </div>
      <div className={clsx(s.subTotal)}>
        Merchandise Subtotal: {formatNumber(subTotal)}
      </div>
      <div className={clsx(s.shipping)}>
        Shipping Total: {formatNumber(shipTotal)}
      </div>
      <div className={clsx(s.discount)}>
        Promotion: {formatNumber(promotion)}
      </div>
      <div className={clsx(s.payment)}>
        Payment Method: {paymentType === "Delivery" ? "COD" : "PayPal"}
      </div>
      <div className={clsx(s.total)}>
        Total bill:
        {subTotal + shipTotal - promotion < 0
          ? "$0.00"
          : formatNumber(subTotal + shipTotal - promotion)}
      </div>
      <div className={clsx(s.submitBtn)}>
        <Button onClick={handleSubmitBtn}>Place order</Button>
      </div>
    </div>
  );
}
