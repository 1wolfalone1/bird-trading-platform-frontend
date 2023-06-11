import React from "react";
import clsx from "clsx";
import s from "./Item.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { Fragment } from "react";

const ProductItem = ({ id, name, shopName, image, shopAvt, price, sale }) => {
  return (
    <Fragment>
      <Grid container columns={8} key={id} className={clsx(s.container)}>
        <Grid sm={2} md={2} xl={2} className={clsx(s.productImage)}>
          <img src={image} alt={name} />
        </Grid>
        <Grid sm={4} md={4} xl={4} className={clsx(s.productInfo)}>
          <Grid className={clsx(s.productName)}>
            <h3>{name}</h3>
          </Grid>
          <Grid className={clsx(s.shop)}>
            <Grid className={clsx(s.shopImage)}>
              <img src={shopAvt} alt={shopName} />
            </Grid>
            <Grid className={clsx(s.shopName)}>
              <h3>{shopName}</h3>
            </Grid>
          </Grid>
        </Grid>

        <Grid sm={2} md={2} xl={2} className={clsx(s.productPrice)}>
          <Grid className={clsx(s.price)}>
            <h3>{price}$</h3>
          </Grid>
          <Grid className={clsx(s.sale)}>
            <h3>(Sale off {sale})</h3>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProductItem;
