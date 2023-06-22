import React from "react";
import clsx from "clsx";
import s from "./Item.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { Fragment } from "react";

const ProductItem = ({ id, name, shopName, quantity, image, price }) => {
  return (
    <Fragment>
      <Grid container columns={10} key={id} className={clsx(s.container)}>
        <Grid sm={2} md={2} xl={2} className={clsx(s.productImage)}>
          <img src={image} alt={name} />
        </Grid>
        <Grid sm={5} md={5} xl={5} className={clsx(s.productInfo)}>
          <Grid className={clsx(s.productName)}>
            {name}
          </Grid>
        </Grid>

        <Grid sm={1} md={1} xl={1} className={clsx(s.productQuantity)}>
          <h3>{quantity}</h3>
        </Grid>

        <Grid sm={2} md={2} xl={2} className={clsx(s.productPrice)}>
          <h3>{Number(price).toFixed(2)}$</h3>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProductItem;
