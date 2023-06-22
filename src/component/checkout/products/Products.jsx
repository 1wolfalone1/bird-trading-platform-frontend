import React from "react";
import clsx from "clsx";
import s from "../products/Products.module.scss";
import Product from "./item/Item";
import Grid from "@mui/material/Unstable_Grid2";

const formatNumber = (q) => {
  return q.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export default function Products({ products }) {
  return (
    <div>
      <div className={clsx(s.products)}>
        <div className={clsx(s.title)}>
          Expected delivery at{" "}
          {new Date(new Date().getTime() + 604800000).toLocaleDateString(
            "en-GB"
          )}
        </div>
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
      </div>
    </div>
  );
}
