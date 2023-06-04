import clsx from "clsx";
import s from "./products.module.scss";
import React from "react";
import ProductCard from "./product-card/ProductCard";
import Grid from "@mui/material/Unstable_Grid2";

export default function Products({ products }) {
   console.log(products);
   return (
      <>
         <Grid container spacing={5} marginRight={4}  marginLeft={4} marginTop={1} marginBottom={1}>
            {products
               ? products.map((product) => (
                    <Grid xs={3} key={product.id}>
                       <ProductCard product={product} />
                    </Grid>
                 ))
               : ""}
         </Grid>
      </>
   );
}