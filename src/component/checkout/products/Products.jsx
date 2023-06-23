import React, { useEffect, useState } from "react";
import clsx from "clsx";
import s from "../products/Products.module.scss";
import Product from "./item/Item";
import Grid from "@mui/material/Unstable_Grid2";
import ShopTitle from "./shop-title/ShopTitle";
import { Box, Typography } from "@mui/material";
import Style from "../../../style/inline-style/style";
import { calculateDistance } from "../../../utils/myUtils";
import { useSelector } from "react-redux";
import orderSlice, {
   orderSliceSelector,
} from "../../../redux/global/orderSlice";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const formatNumber = (q) => {
   return q.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
   });
};

export default function Products({ products, deliveryInfo, isLoaded }) {
   const [distance, setDistance] = useState();
   const [shipPrice, setShipPrice] = useState();
   const { itemsByShop } = useSelector(orderSliceSelector);
   useEffect(() => {
      if (deliveryInfo && isLoaded) {
         if (deliveryInfo.address) {
            const dis = getDistance(deliveryInfo.address)
               .then((distance) => {
                  setDistance(distance);
               })
               .catch((error) => {
                  console.error(error);
               });
         }
      }
   }, [deliveryInfo]);
   useEffect(() => {
      if (typeof distance === "number") {
         getShipping();
      }
   }, [distance]);
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
               {shipPrice ? (
                  <>
                     <Grid xs={9}>
                        <Typography>{distance ? distance : ""}</Typography>
                     </Grid>
                     <Grid xs={3}>
                        <Box sx={{ display: "flex" }}>
                           <Box
                              sx={{
                                 gap: "1rem",
                                 borderTop: "0.1rem solid #000000",
                                 flexShrink: "0",
                                 display: "flex",
                                 alignItems: "center",
                              }}
                           >
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
                                 {shipPrice?.shippingFee}
                              </Typography>
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
