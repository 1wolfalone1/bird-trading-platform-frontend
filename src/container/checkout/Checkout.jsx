import { Backdrop, Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useJsApiLoader } from "@react-google-maps/api";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { api } from "../../api/server/API";
import Delivery from "../../component/checkout/delivery/Delivery";
import OrderBill from "../../component/checkout/orderBill/OrderBill";
import Payment from "../../component/checkout/payment/Payment";
import Products from "../../component/checkout/products/Products";
import TotalOrder from "../../component/checkout/totalOrder/TotalOrder";
import Voucher from "../../component/checkout/voucher/Voucher";
import orderSlice, { orderSliceSelector } from "../../redux/global/orderSlice";
import persistSlice, {
  persistSliceSelector,
} from "../../redux/global/persistSlice";
import { userInfoSelector } from "../../redux/global/userInfoSlice";
import { fix2 } from "../../utils/myUtils";
import cartSlice, { getCartSelector } from "../order/cartSlice";
import s from "./checkout.module.scss";

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
  const [listShopOwnersItems, setListShopOwnersItems] = useState([]);
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
    setListShopOwnersItems(listTemp);
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
            dispatch(persistSlice.actions.clearTempOrder());
            console.log(response.data, response.paymentId, response.PayerID);
            dispatch(cartSlice.actions.removeCart());
            localStorage.removeItem("cart");
            navigate("/order-history");
          })
          .catch((error) => {
            console.error(error, "error paypal");
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

  const handleCheckout = () => {
    if (
      !deliveryInfo?.fullName ||
      !deliveryInfo?.phoneNumber ||
      !deliveryInfo?.address ||
      !paymentMethod
    )
      return true;
    return false;
  };
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
                closeOnDocumentClick={false}
                trigger={
                  <Button
                    disabled={handleCheckout()}
                    style={{ opacity: handleCheckout() ? 0.8 : 1 }}
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
