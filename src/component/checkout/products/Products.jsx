import React from "react";
import clsx from "clsx";
import s from "../products/Products.module.scss";
import Product from "./item/Item";
import Grid from "@mui/material/Unstable_Grid2";
import ShopTitle from "./shop-title/ShopTitle";
import { Box, Typography } from "@mui/material";
import Style from "../../../style/inline-style/style";
import { formatNumber } from "../../../utils/myUtils";

export default function Products({ products }) {
  console.log(products);
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
              price={formatNumber(item.discountedPrice * item.cartQuantity)}
              quantity={item.cartQuantity}
            ></Product>
          ))}
        <Grid container spacing={2}>
          <Grid xs={9}></Grid>
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
                <Typography variant="h4" sx={{ fontSize: "2.4rem" }}>
                  Ship price:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "2.4rem",
                    color: Style.color.$Money,
                  }}
                >
                  20
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
