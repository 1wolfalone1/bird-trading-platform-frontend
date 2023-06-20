import React from "react";
import clsx from "clsx";
import s from "./checkout.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import Products from "../../component/checkout/products/Products";
import Payment from "../../component/checkout/payment/Payment";
import Delivery from "../../component/checkout/delivery/Delivery";
import Voucher from "../../component/checkout/voucher/Voucher";
import TotalOrder from "../../component/checkout/totalOrder/TotalOrder";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, { getCartSelector } from "../order/cartSlice";
import { useState } from "react";
import Popup from "reactjs-popup";
import OrderBill from "../../component/checkout/orderBill/OrderBill";
import { Button } from "@mui/material";
import { userInfoSelector } from "../../redux/global/userInfoSlice";
import COD from "../../asset/image/COD.avif";
import PayPal from "../../asset/image/Paypal.avif";
import { useEffect } from "react";
import { api } from "../../api/server/API";
import { useNavigate } from "react-router-dom";

const payment = [
  {
    id: 1,
    image:
      "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/paypal.jpg",
    method: "PayPal Wallet",
    discount: 5,
    name: "PayPal",
  },
  {
    id: 2,
    image:
      "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/cash-delivery.jpg",
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let subTotal = Number(
    items
      .reduce(
        (total, item) => total + item.discountedPrice * item.cartQuantity,
        0
      )
      .toFixed(2)
  );

  let shipTotal = !voucherSelected.shipping
    ? Number((0.05 * subTotal).toFixed(2))
    : 0;

  let promotion = voucherSelected.discount?.discount ?? 0;

  const handleCheckout = () => {
    return (
      !info.address?.street ||
      !info.address?.ward ||
      !info.address?.district ||
      !info.address?.city ||
      !info?.fullName ||
      !info?.phoneNumber ||
      paymentType === undefined
    );
  };

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
      ? Number(subTotal + shipTotal - promotion).toFixed(2)
      : 0;
  };
  const data = {
    userOrderDto: {
      email: info.email,
      name: info.fullName,
      phoneNumber: info.phoneNumber,
      street: info.address?.street,
      ward: info.address?.ward,
      district: info.address?.district,
      city: info.address?.city,
    },
    transactionDto: {
      totalPrice: totalPrice(),
      promotionId: promotionId,
      paymentMethod: "PAYPAL",
    },
    productOrder: productOrder,
  };

  const params = new URLSearchParams(window.location.search);
  useEffect(() => {
    let status = params.get("status");
    if (status === "success") {
      const paymentId = params.get("paymentId");
      const PayerID = params.get("PayerID");
      console.log(data);
      api
        .post("/package-order", data, {
          params: { paymentId: paymentId, PayerID: PayerID },
        })
        .then((response) => {
          console.log(response.data, response.paymentId, response.PayerID);
          // dispatch(cartSlice.actions.removeCart());
          // localStorage.removeItem("cart");
          navigate("/order-status");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div>
      <Grid container columns={11} className={clsx(s.container)}>
        <Grid sm={11} md={7} xl={7} className={clsx(s.left)}>
          <Products products={items} />
        </Grid>
        <Grid sm={11} md={4} xl={4} className={clsx(s.right)}>
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
