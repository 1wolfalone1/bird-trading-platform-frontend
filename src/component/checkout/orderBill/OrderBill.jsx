import React from "react";
import clsx from "clsx";
import s from "./orderBill.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import axios from "axios";
import { getCartSelector } from "../../../container/order/cartSlice";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../redux/global/userInfoSlice";

export default function OrderBill({ close, paymentType }) {
  const { items, voucherSelected } = useSelector(getCartSelector);
  console.log(voucherSelected);
  const { info } = useSelector(userInfoSelector);
  let subTotal = Number(
    items
      .reduce(
        (total, item) => total + item.discountedPrice * item.cartQuantity,
        0
      )
      .toFixed(1)
  );

  let shipTotal = !voucherSelected.shipping
    ? Number((0.05 * subTotal).toFixed(1))
    : 0;

  let promotion = voucherSelected.discount?.discount ?? 0;

  console.log(info);
  const handleSubmitBtn = () => {
    // Create a data object with the required payload
    const productOrder = items.reduce((order, item) => {
      order[item.productId] = item.quantity;
      return order;
    }, {});

    // const promotionId = voucherSelected.map((voucher) => voucher.id);
    // console.log(promotionId);
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
        totalPrice: Number((subTotal + shipTotal - promotion).toFixed(1)),
        promotionId: [],
        paymentMethod: paymentType,
      },
      productOrder: productOrder,
    };

    // Make a POST request to the backend API using Axios
    axios
      .post("thongtienthienphuot.shop/api/v1/package-order", data)
      .then((response) => {
        // Handle the response from the backend, if needed
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

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
          <Grid className={clsx(s.billInfo)}>
            <Grid container columns={12} key={item.id} className={clsx(s.bill)}>
              <Grid sm={7} md={7} xl={7} className={clsx(s.name)}>
                {item.name}
              </Grid>
              <Grid sm={2} md={2} xl={2} className={clsx(s.quantity)}>
                {item.cartQuantity}
              </Grid>
              <Grid sm={3} md={3} xl={3} className={clsx(s.price)}>
                {Number(item.discountedPrice * item.cartQuantity).toFixed(1)}$
              </Grid>
            </Grid>
          </Grid>
        ))}
      </div>
      <div className={clsx(s.payment)}>
        Payment Method: {paymentType === "Delivery" ? "COD" : "PayPal"}
      </div>
      <div className={clsx(s.shipping)}>Shipping Total: {shipTotal}$</div>
      <div className={clsx(s.discount)}>Promotion: {promotion}$</div>
      <div className={clsx(s.total)}>
        Total bill: {Number(subTotal + shipTotal - promotion).toFixed(1)}$
      </div>
      <div className={clsx(s.submitBtn)}>
        <Button onClick={handleSubmitBtn}>Place Order</Button>
      </div>
    </div>
  );
}
