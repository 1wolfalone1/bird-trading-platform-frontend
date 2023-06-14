import React from "react";
import clsx from "clsx";
import s from "./checkout.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import Products from "../../component/checkout/products/Products";
import Payment from "../../component/checkout/payment/Payment";
import Delivery from "../../component/checkout/delivery/Delivery";
import Voucher from "../../component/checkout/voucher/Voucher";
import TotalOrder from "../../component/checkout/totalOrder/TotalOrder";
import { useSelector } from "react-redux";
import { getCartSelector } from "../order/cartSlice";
import { useState } from "react";
import Popup from "reactjs-popup";
import OrderBill from "../../component/checkout/orderBill/OrderBill";
import { Button } from "@mui/material";
import { userInfoSelector } from "../../redux/global/userInfoSlice";

const payment = [
  {
    id: 1,
    image:
      "https://www.nicepng.com/png/detail/19-194337_paypal-logo-transparent-png-paypal-logo-transparent.png",
    method: "PayPal Wallet",
    discount: 5,
    name: "PayPal",
  },
  {
    id: 2,
    image:
      "https://www.inventicons.com/uploads/iconset/703/wm/512/Cash_on_delivery-98.png",
    method: "Cash on delivery (COD)",
    discount: 0,
    name: "Delivery",
  },
];

export default function Checkout() {
  const { items, voucherSelected } = useSelector(getCartSelector);
  const [paymentType, setPaymentType] = useState();
  const { info } = useSelector(userInfoSelector);

  const handleSelectPayment = (paymentName) => {
    setPaymentType(paymentName);
  };
  console.log(paymentType);

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

  const handleCheckout = () => {
    return (
      paymentType === undefined ||
      info.address.street === null ||
      info.address.ward === null ||
      info.address.district === null ||
      info.address.city === null ||
      info.fullName === null ||
      info.phoneNumber === null
    );
  };

  console.log("paymentType:", paymentType);
  return (
    <div>
      <Grid container columns={11} className={clsx(s.container)}>
        <Grid sm={7} md={7} xl={7} className={clsx(s.left)}>
          <Products products={items} />
        </Grid>
        <Grid sm={4} md={4} xl={4} className={clsx(s.right)}>
          <Delivery userInfo={info} />
          <Voucher vouchers={voucherSelected} />
          <Payment
            handleSelectPayment={handleSelectPayment}
            payment={payment}
          />
          <TotalOrder
            subTotal={subTotal}
            shipTotal={shipTotal}
            promotion={promotion}
          />
          <div className={clsx(s.orderButton)}>
            <Popup
              className="addButton"
              modal
              trigger=<Button disabled={handleCheckout()}>Check out</Button>
            >
              {(close) => <OrderBill close={close} paymentType={paymentType} />}
            </Popup>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
