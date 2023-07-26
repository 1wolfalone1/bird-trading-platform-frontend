import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartSelector } from "../../../container/order/cartSlice";
import globalConfigSlice from "../../../redux/global/globalConfigSlice";
import orderSlice from "../../../redux/global/orderSlice";
import Style from "../../../style/inline-style/style";
import { calculateDistance, fix2 } from "../../../utils/myUtils";
import s from "../products/Products.module.scss";
import { formatNumber } from "./../../../utils/myUtils";
import Product from "./item/Item";
import ShopTitle from "./shop-title/ShopTitle";

const boxPrice = {
   display: "flex",
   alignItems: "center",
   flexDirection: "column",
   justifyContent: "space-between",
   width: "100%",
};

export default function Products({ products, deliveryInfo, isLoaded }) {
   const { voucherSelected } = useSelector(getCartSelector);
   const [distance, setDistance] = useState(0);
   const [shipPrice, setShipPrice] = useState(0);
   const [totalShop, setTotalShop] = useState();
   const dispatch = useDispatch();
   useEffect(() => {
      if (deliveryInfo && isLoaded) {
         if (deliveryInfo.address) {
            const dis = getDistance(deliveryInfo.address)
               .then((distance) => {
                  setDistance(distance);
               })
               .catch((error) => {
                  setDistance(-1);
                  console.error(error);
               });
         }
      }
   }, [deliveryInfo, isLoaded]);
   useEffect(() => {
      if (typeof distance === "number" && voucherSelected.shipping === null) {
         getShipping();
      }
   }, [distance, deliveryInfo]);

   useEffect(() => {
      if (products) {
         const total = products?.reduce((acc, item) => {
            const newPice = acc + item.discountedPrice * item.cartQuantity;
            return newPice;
         }, 0);
         setTotalShop(total);
      }
   }, [products]);

   useEffect(() => {
      dispatch(globalConfigSlice.actions.changeBackDrops(true));
      const listShopItems = products.reduce((acc, product) => {
         return { ...acc, [product.id]: product.cartQuantity };
      }, {});
      dispatch(
         orderSlice.actions.updateItemsByShop({
            totalShopPrice: isNaN(fix2(totalShop)) ? +0 : fix2(totalShop),
            shippingFee: isNaN(fix2(shipPrice)) ? +0 : fix2(shipPrice),
            distance: distance || distance === 0 ? distance / 1000 : -1,
            shopId: products[0].shopOwner.id,
            listItems: listShopItems,
         })
      );
      dispatch(globalConfigSlice.actions.changeBackDrops(false));
   }, [shipPrice, totalShop]);
   const getShipping = async () => {
      try {
         const distanceInKm = distance / 1000;
         const res = await fetch(
            `https://gofship.shop/api/v1/shipping-fee?distance=${distanceInKm}`
         );
         const data = await res.json();
         setShipPrice(data.shippingFee);
      } catch (err) {
         console.log(err);
      }
   };
   const getDistance = async (destination) => {
      const distance = await calculateDistance(
         products[0].shopOwner.address.address,
         destination
      );
      return distance;
   };
   return (
      <div>
         <div className={clsx(s.products)}>
            <ShopTitle shop={products[0].shopOwner} />
            <Grid className={clsx(s.productList)}>
               <Grid className={clsx(s.header)}>
                  <Grid container columns={10}>
                     <Grid sm={7} md={7} xl={7} className={clsx(s.item)}>
                        Item
                     </Grid>
                     <Grid sm={1} md={1} xl={1} className={clsx(s.quantity)}>
                        Quantity
                     </Grid>
                     <Grid sm={2} md={2} xl={2} className={clsx(s.price)}>
                        Total
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
            {products &&
               products.map((item) => (
                  <Product
                     key={item.id}
                     id={item.id}
                     name={item.name}
                     shopName={item.shopOwner.shopName}
                     image={item.imgUrl}
                     price={formatNumber(
                        item.discountedPrice * item.cartQuantity
                     )}
                     quantity={item.cartQuantity}
                  ></Product>
               ))}
            <Grid container spacing={2}>
               {deliveryInfo?.address ? (
                  <>
                     <Grid xs={12}>
                        <Box sx={{ display: "flex" }}>
                           <Box
                              sx={{
                                 gap: "1rem",
                                 borderTop: "0.1rem solid #000000",
                                 display: "flex",
                                 width: "100%",
                              }}
                           >
                              <Box sx={boxPrice}>
                                 <Typography
                                    variant="h4"
                                    sx={{ fontSize: "2.4rem" }}
                                 >
                                    Total order:
                                 </Typography>
                                 <Typography
                                    sx={{
                                       fontSize: "2.4rem",
                                       color: Style.color.$Money,
                                    }}
                                 >
                                    {formatNumber(totalShop)}
                                 </Typography>
                              </Box>
                              <Box sx={boxPrice}>
                                 <Typography
                                    variant="h4"
                                    sx={{ fontSize: "2.4rem" }}
                                 >
                                    Ship price:
                                 </Typography>
                                 <Typography
                                    sx={{
                                       fontSize: "2.4rem",
                                       color: Style.color.$Money,
                                    }}
                                 >
                                    {formatNumber(shipPrice)}
                                 </Typography>
                              </Box>
                              <Box sx={{ ...boxPrice }}>
                                 <Typography
                                    sx={{
                                       fontSize: "2.4rem",
                                       color: Style.color.$Money,
                                    }}
                                 >
                                    Total shop:
                                 </Typography>{" "}
                                 <Typography
                                    sx={{
                                       fontSize: "2.4rem",
                                       color: Style.color.$Money,
                                    }}
                                 >
                                    {isNaN(totalShop + shipPrice)
                                       ? 0
                                       : formatNumber(totalShop + shipPrice)}
                                 </Typography>
                              </Box>
                           </Box>
                        </Box>
                     </Grid>
                  </>
               ) : (
                  <>
                     <Grid2 xs={12}>
                        <Typography sx={{ fontSize: "2.4rem" }}>
                           Provide your address to calculate price
                        </Typography>
                     </Grid2>
                  </>
               )}
            </Grid>
         </div>
      </div>
   );
}
