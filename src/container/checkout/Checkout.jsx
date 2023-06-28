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
import { Backdrop, Button, CircularProgress } from "@mui/material";
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
import orderSlice, { orderSliceSelector } from "../../redux/global/orderSlice";
import PaymentMethod from "./../../component/checkout/payment/paymentMethod/PaymentMethod";
import { fix2 } from "../../utils/myUtils";
import { persistSliceSelector } from "../../redux/global/persistSlice";

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
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_API}`,
    libraries: lib,
  });
  const { items, voucherSelected } = useSelector(getCartSelector);
  const userInfo = useSelector(userInfoSelector);
  const [openBackDrop, setBackDrop] = useState(false);
  const flag = useRef(false);
  const { tempOrder } = useSelector(persistSliceSelector);
  const [listShopOwnersItems, setListShopOweersItems] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const { itemsByShop, total, paymentMethod, infoDelivery } =
    useSelector(orderSliceSelector);

  const handleSelectPayment = (paymentName) => {
    dispatch(orderSlice.actions.updatePaymentMethod(paymentName));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    setListShopOweersItems(listTemp);
  }, []);

  useEffect(() => {
    setDeliveryInfo({
      fullName: userInfo.info.fullName,
      phoneNumber: userInfo.info.phoneNumber,
      address: userInfo.info.address,
    });
  }, [userInfo]);

  const params = new URLSearchParams(window.location.search);
  useEffect(() => {
    let status = params.get("status");
    if (status === "success") {
      const paymentId = params.get("paymentId");
      const PayerID = params.get("PayerID");
      if (flag.current === false) {
        setBackDrop(true);
        api
          .post("/package-order", tempOrder, {
            params: { paymentId: paymentId, PayerID: PayerID },
          })
          .then((response) => {
            console.log(response.data, response.paymentId, response.PayerID);
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
  useEffect(() => {
    dispatch(orderSlice.actions.updatePromotion(voucherSelected));
  }, [voucherSelected]);
  useEffect(() => {
    if (itemsByShop && Array.isArray(itemsByShop)) {
      const subTotal = itemsByShop.reduce((acc, item) => {
        return fix2(acc + +item.totalShopPrice);
      }, 0);

      const shipTotal = itemsByShop.reduce((acc, item) => {
        return fix2(acc + +item.shippingFee);
      }, 0);

      let promotionFee = fix2(voucherSelected?.discount?.discount);
      if (!promotionFee) {
        promotionFee = 0;
      }

      dispatch(
        orderSlice.actions.updateTotal({
          subTotal: subTotal,
          shippingTotal: shipTotal,
          promotionFee: promotionFee,
          paymentTotal: fix2(subTotal + +shipTotal - promotionFee),
        })
      );
    }
  }, [itemsByShop]);
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
            {listShopOwnersItems
              ? listShopOwnersItems.map((lists) => (
                  <Products
                    products={lists.data}
                    key={lists.id}
                    deliveryInfo={deliveryInfo}
                    isLoaded={isLoaded}
                  />
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
              subTotal={total?.subTotal}
              shipTotal={total?.shippingTotal}
              promotion={total?.promotionFee}
            />
            <div className={clsx(s.orderButton)}>
              <Popup
                className="addButton"
                modal
                trigger={
                  <Button
                    disabled={
                      !deliveryInfo?.fullName ||
                      !deliveryInfo?.phoneNumber ||
                      !deliveryInfo?.address ||
                      !paymentMethod
                    }
                  >
                    Check out
                  </Button>
                }
              >
                {(close) => (
                  <OrderBill
                    close={close}
                    listShopOwnersItems={listShopOwnersItems}
                    deliveryInfo={deliveryInfo}
                  />
                )}
              </Popup>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
