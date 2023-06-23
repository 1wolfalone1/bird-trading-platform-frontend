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
import { Backdrop, Button, CircularProgress, Modal } from "@mui/material";
import { userInfoSelector } from "../../redux/global/userInfoSlice";
import COD from "../../asset/image/COD.avif";
import PayPal from "../../asset/image/Paypal.avif";
import { useEffect } from "react";
import { api } from "../../api/server/API";
import { useNavigate } from "react-router-dom";
import globalConfigSlice, {
  globalConfigSliceSelector,
} from "../../redux/global/globalConfigSlice";
import { useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

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
const lib = ["places"];
export default function Checkout() {
   const { items, voucherSelected } = useSelector(getCartSelector);
   const [paymentType, setPaymentType] = useState();
   const userInfo = useSelector(userInfoSelector);
   const [data, setData] = useState();
   const [openBackDrop, setBackDrop] = useState(false);
   const { tempDataOrder } = useSelector(globalConfigSliceSelector);
   const flag = useRef(false);
   const [subTotal, setSubTotal] = useState();
   const [shipTotal, setShipTotal] = useState();
   const [promotion, setPromotion] = useState();
   const [listShopOwersItems, setListShopOweersItems] = useState([]);
   const [deliveryInfo, setDeliveryInfo] = useState({
      fullName: "",
      phoneNumber: "",
      address: "",
   });
   const handleSelectPayment = (paymentName) => {
      setPaymentType(paymentName);
   };
   const navigate = useNavigate();
   const dispatch = useDispatch();
   useEffect(() => {
      setSubTotal(
         Number(
            items
               .reduce(
                  (total, item) =>
                     total + item.discountedPrice * item.cartQuantity,
                  0
               )
               .toFixed(2)
         )
      );
      setShipTotal(
         !voucherSelected.shipping ? Number((0.05 * subTotal).toFixed(2)) : 0
      );
      setPromotion(voucherSelected.discount?.discount ?? 0);
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
      console.log(listTemp, "listTemp ne ");
      setListShopOweersItems(listTemp);
      setDeliveryInfo({
         fullName: userInfo.fullName,
         phoneNumber: userInfo.phoneNumber,
         address: userInfo.address,
      });
   }, []);
   const handleCheckout = () => {
      const info = userInfo.info;
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

   const getOrderData = (info) => {
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
      dispatch(
         globalConfigSlice.actions.saveTempDataOrder({
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
         })
      );
   };
   useEffect(() => {
      getOrderData(userInfo?.info);
   }, [userInfo]);

   const params = new URLSearchParams(window.location.search);
   useEffect(() => {
      let status = params.get("status");
      console.log(status, "here is status");
      if (status === "success") {
         console.log(tempDataOrder, flag);
         const paymentId = params.get("paymentId");
         const PayerID = params.get("PayerID");
         if (flag.current === false) {
            setBackDrop(true);
            api.post("/package-order", tempDataOrder, {
               params: { paymentId: paymentId, PayerID: PayerID },
            })
               .then((response) => {
                  console.log(
                     response.data,
                     response.paymentId,
                     response.PayerID
                  );
                  dispatch(cartSlice.actions.removeCart());
                  localStorage.removeItem("cart");
                  navigate("/order-status");
               })
               .catch((error) => {
                  console.error(error);
               });
         }
      }
      return () => {
         flag.current = true;
      };
   }, []);
   console.log(items);
   return (
      <>
         <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackDrop}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
         <div>
            <Grid container columns={11} className={clsx(s.container)}>
               <Grid sm={11} md={7} xl={7} className={clsx(s.left)}>
                  {listShopOwersItems
                     ? listShopOwersItems.map((lists) => (
                          <Products products={lists.data} key={lists.id} />
                       ))
                     : ""}
               </Grid>
               <Grid sm={11} md={4} xl={4} className={clsx(s.right)}>
                  <Delivery
                     deliveryInfo={deliveryInfo}
                     setDeliveryInfo={setDeliveryInfo}
                  />
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
                        trigger=<Button disabled={handleCheckout()}>
                           Check out
                        </Button>
                     >
                        {(close) => (
                           <OrderBill close={close} paymentType={paymentType} />
                        )}
                     </Popup>
                  </div>
               </Grid>
            </Grid>
         </div>
      </>
   );
}