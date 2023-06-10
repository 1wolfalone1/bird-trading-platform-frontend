import React from "react";
import clsx from "clsx";
import s from "./checkout.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import Products from "../../component/checkout/products/Products";
import Payment from "../../component/checkout/payment/Payment";
import Delivery from "../../component/checkout/delivery/Delivery";
import Voucher from "../../component/checkout/voucher/Voucher";
import TotalOrder from "../../component/checkout/totalOrder/TotalOrder";

const products = [
  {
    id: 1,
    name: "Blue Jay Blue Jay Blue Jay",
    shopName: "Shop 1",
    image:
      "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/302355171/1800",
    shopAvt:
      "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/302355171/1800",
    price: 10,
    sale: "5%",
  },
  {
    id: 2,
    name: "Cardinal Cardinal Cardinal",
    shopName: "Shop 2",
    image:
      "https://www.thespruce.com/thmb/MAIPOntEWbxzkwi-MQLeSKL_74c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/northern-cardinal-profile-387268-02-aa299072737b4de78180a11dfc110bc9.jpg",
    shopAvt:
      "https://www.thespruce.com/thmb/MAIPOntEWbxzkwi-MQLeSKL_74c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/northern-cardinal-profile-387268-02-aa299072737b4de78180a11dfc110bc9.jpg",
    price: 12,
    sale: "10%",
  },
  {
    id: 3,
    name: "Hummingbird Hummingbird",
    shopName: "Shop 3",
    image:
      "https://www.birdnote.org/sites/default/files/annas-hummingbird-thriving-Becky-Matsubara-cc-crp.jpg",
    shopAvt:
      "https://www.birdnote.org/sites/default/files/annas-hummingbird-thriving-Becky-Matsubara-cc-crp.jpg",
    price: 8,
    sale: "5%",
  },
];

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
    name: "COD",
  },
  // {
  //   id: 3,
  //   image: "https://example.com/creditcard.png",
  //   method: "Credit Card",
  //   discount: 10,
  // },
];

const deliveryInfo = {
  customerName: "Huynh Van Phuot",
  phone: "0123456789",
  address: "Thu Duc City, HCM City",
};

const vouchers = [
  {
    id: 1,
    image: "https://img.timviec.com.vn/2020/10/voucher-la-gi-3.jpg",
    name: "Happy new year",
    reduce: "3$",
  },
  {
    id: 2,
    image: "https://img.timviec.com.vn/2020/10/voucher-la-gi-3.jpg",
    name: "Newbie",
    reduce: "50%",
  },
];

export default function Checkout() {

  return (
    <div>
      <Grid container columns={11} className={clsx(s.container)}>
        <Grid sm={7} md={7} xl={7} className={clsx(s.left)}>
          <Products products={products} />
        </Grid>
        <Grid sm={4} md={4} xl={4} className={clsx(s.right)}>
          <Delivery />
          <Voucher vouchers={vouchers} />
          <Payment payment={payment} />
          <TotalOrder />
        </Grid>
      </Grid>
    </div>
  );
}
