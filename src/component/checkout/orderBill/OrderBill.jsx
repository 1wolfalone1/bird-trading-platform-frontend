import React, { useState } from "react";
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

export default function OrderBill({
   close,
   paymentType,
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
   console.log(listShopOwnersItems, "list shop owners");
   const handleSubmitBtn = () => {
      const data = {
         userOrderDto: {
            fullName: deliveryInfo.fullName,
            phoneNumber: deliveryInfo.phoneNumber,
            address: deliveryInfo.address,
         },
         orders: orderShop,
      };

      api.post("/package-order", data)
         .then((response) => {
            // Handle the response from the backend, if needed
            if (paymentType === "PayPal") {
               if (response.data.successCode == 200) {
                  window.location.href =
                     response.data.successMessage.substring(10);
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
                  <AddToCartToast
                     type={toastType.WARNING}
                     msg={errorMessage}
                  />,
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
               <>
                  {shop?.data?.map((product, i) => (
                     <>
                        {i === 0 ? (
                           <>
                              <Grid
                                 className={clsx(s.billInfo)}
                                 key={product.id}
                              >
                                 <Grid
                                    container
                                    columns={12}
                                    className={clsx(s.bill)}
                                 >
                                    <Grid
                                       sm={7}
                                       md={7}
                                       xl={7}
                                       className={clsx(s.name)}
                                    >
                                       <Box>
                                          <Typography>
                                             {product.shopOwner.shopName}
                                          </Typography>
                                          <Typography>
                                             {" "}
                                             {product.name}
                                          </Typography>
                                       </Box>
                                    </Grid>
                                    <Grid
                                       sm={2}
                                       md={2}
                                       xl={2}
                                       className={clsx(s.quantity)}
                                    >
                                       {product.cartQuantity}
                                    </Grid>
                                    <Grid
                                       sm={3}
                                       md={3}
                                       xl={3}
                                       className={clsx(s.price)}
                                    >
                                       {formatNumber(
                                          product.discountedPrice *
                                             product.cartQuantity
                                       )}
                                    </Grid>
                                 </Grid>
                              </Grid>
                           </>
                        ) : (
                           <>
                              <Grid
                                 className={clsx(s.billInfo)}
                                 key={product.id}
                              >
                                 <Grid
                                    container
                                    columns={12}
                                    className={clsx(s.bill)}
                                 >
                                    <Grid
                                       sm={7}
                                       md={7}
                                       xl={7}
                                       className={clsx(s.name)}
                                    >
                                       {product.name}
                                    </Grid>
                                    <Grid
                                       sm={2}
                                       md={2}
                                       xl={2}
                                       className={clsx(s.quantity)}
                                    >
                                       {product.cartQuantity}
                                    </Grid>
                                    <Grid
                                       sm={3}
                                       md={3}
                                       xl={3}
                                       className={clsx(s.price)}
                                    >
                                       {formatNumber(
                                          product.discountedPrice *
                                             product.cartQuantity
                                       )}
                                    </Grid>
                                 </Grid>
                              </Grid>
                           </>
                        )}
                     </>
                  ))}
               </>
            ))}
         </div>
         <div className={clsx(s.subTotal)}>
            Merchandise Subtotal: {formatNumber(total?.subTotal)}
         </div>
         <div className={clsx(s.shipping)}>
            Shipping Total: {formatNumber(total?.shippingTotal)}
         </div>
         <div className={clsx(s.discount)}>
            Promotion: {formatNumber(total?.promotionFee)}
         </div>
         <div className={clsx(s.payment)}>
            Payment Method: {paymentType === "Delivery" ? "COD" : "PayPal"}
         </div>
         <div className={clsx(s.total)}>
            Total bill:
            {formatNumber(total?.paymentTotal)}
         </div>
         <div className={clsx(s.submitBtn)}>
            <Button onClick={handleSubmitBtn}>Place order</Button>
         </div>
      </div>
   );
}
