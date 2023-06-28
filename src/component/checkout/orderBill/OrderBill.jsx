import React, { Fragment, useState } from "react";
import clsx from "clsx";
import s from "./orderBill.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Typography } from "@mui/material";
import cartSlice, { getCartSelector } from "../../../container/order/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { userInfoSelector } from "../../../redux/global/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/server/API";
import { toast } from "react-toastify";
import AddToCartToast, { toastType } from "../../toast/content/AddToCartToast";
import { formatNumber } from "../../../utils/myUtils";
import { orderSliceSelector } from "../../../redux/global/orderSlice";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import orderSlice from "./../../../redux/global/orderSlice";
import persistSlice from "../../../redux/global/persistSlice";
import { LoadingButton } from "@mui/lab";
export default function OrderBill({
  close,
  voucher,
  orderShop,
  deliveryInfo,
  listShopOwnersItems,
}) {
  const { items, voucherSelected } = useSelector(getCartSelector);
  const { info } = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { itemsByShop, paymentMethod, promotionIds, total } =
    useSelector(orderSliceSelector);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmitBtn = () => {
    setIsLoading(true);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    dispatch(
      orderSlice.actions.updateInfoDelivery({
        fullName: deliveryInfo?.fullName,
        phoneNumber: deliveryInfo?.phoneNumber,
        address: deliveryInfo?.address,
      })
    );

    const data = {
      userInfo: {
        fullName: deliveryInfo.fullName,
        phoneNumber: deliveryInfo.phoneNumber,
        address: deliveryInfo.address,
      },
      cartInfo: {
        itemsByShop,
        paymentMethod,
        promotionIds,
        total,
      },
    };
    console.log(data, "data ne");
    dispatch(persistSlice.actions.saveTempOrder(data));
    api
      .post("/package-order", data)
      .then((response) => {
        // Handle the response from the backend, if needed
        console.log(response);
        if (paymentMethod === "PAYPAL") {
          if (response.data.successCode == 200) {
            window.location.href = response.data.successMessage.substring(10);
          }
        }
        if (paymentMethod === "DELIVERY") {
          if (response.data.successCode == 200) {
            dispatch(orderSlice.actions.clearState());
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
            Shop product
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
        {listShopOwnersItems.map((shop) => (
          <Fragment key={shop?.id}>
            {shop?.data?.map((product, i) => (
              <Fragment key={product?.id}>
                {i === 0 ? (
                  <>
                    <Typography sx={{ fontSize: "2.4rem" }}>
                      {product.shopOwner.shopName}
                    </Typography>
                    <Grid className={clsx(s.billInfo)} key={product.id}>
                      <Grid container columns={12} className={clsx(s.bill)}>
                        <Grid sm={7} md={7} xl={7} className={clsx(s.name)}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "baseline",
                            }}
                          >
                            <Box>
                              <FiberManualRecordIcon
                                sx={{
                                  marginRight: "0.8rem",
                                  fontSize: "1.2rem",
                                }}
                              />{" "}
                            </Box>

                            <Typography
                              sx={{
                                fontSize: "2rem",
                                textAlign: "justify",
                              }}
                            >
                              {product.name}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid sm={2} md={2} xl={2} className={clsx(s.quantity)}>
                          {product.cartQuantity}
                        </Grid>
                        <Grid sm={3} md={3} xl={3} className={clsx(s.price)}>
                          {formatNumber(
                            product.discountedPrice * product.cartQuantity
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid className={clsx(s.billInfo)} key={product.id}>
                      <Grid container columns={12} className={clsx(s.bill)}>
                        <Grid sm={7} md={7} xl={7} className={clsx(s.name)}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "baseline",
                            }}
                          >
                            <Box>
                              <FiberManualRecordIcon
                                sx={{
                                  marginRight: "0.8rem",
                                  fontSize: "1.2rem",
                                }}
                              />
                            </Box>{" "}
                            <Typography
                              sx={{
                                fontSize: "2rem",
                                textAlign: "justify",
                              }}
                            >
                              {"   "}
                              {product.name}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid sm={2} md={2} xl={2} className={clsx(s.quantity)}>
                          {product.cartQuantity}
                        </Grid>
                        <Grid sm={3} md={3} xl={3} className={clsx(s.price)}>
                          {formatNumber(
                            product.discountedPrice * product.cartQuantity
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
      <div className={clsx(s.subTotal)}>
        Merchandise Subtotal: {formatNumber(total?.subTotal)}
      </div>
      <div className={clsx(s.shipping)}>
        Shipping Total: {formatNumber(total?.shippingTotal)}{" "}
        {voucherSelected?.shipping ? "- Free ship" : ""}
      </div>
      <div className={clsx(s.discount)}>
        Promotion: {formatNumber(total?.promotionFee)}
      </div>
      <div className={clsx(s.payment)}>
        Payment Method: {paymentMethod === "DELIVERY" ? "COD" : "PayPal"}
      </div>
      <div className={clsx(s.total)}>
        Total bill:
        {formatNumber(total?.paymentTotal)}
      </div>
      <div className={clsx(s.submitBtn)}>
        <LoadingButton
          loadingIndicator="Sending..."
          loading={isLoading}
          onClick={handleSubmitBtn}
          variant="outlined"
        >
          Place order
        </LoadingButton>
      </div>
    </div>
  );
}
