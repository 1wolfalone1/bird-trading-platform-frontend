import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import clsx from "clsx";
import React from "react";
import Product from "../../../component/checkout/products/item/Item";
import ShopTitle from "../../../component/checkout/products/shop-title/ShopTitle";
import Style from "../../../style/inline-style/style";
import { formatNumber } from "./../../../utils/myUtils";
import s from "./order.module.scss";
import { useNavigate } from "react-router-dom";

const boxPrice = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
};

export default function Order({ order }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className={clsx(s.products)}>
        <ShopTitle shop={order.shopOwner} />
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

        {order.orderDetails &&
          order.orderDetails.map((item) => (
            <div
              onClick={() => navigate(`/product/${item.productId}`)}
              className={clsx(s.product)}
            >
              <Product
                key={item?.productId}
                id={item?.productId}
                name={item?.productName}
                image={item?.imgUrl}
                quantity={item?.quantity.toLocaleString({
                  minimumFractionDigits: 0,
                })}
                price={formatNumber(item.quantity * item.price)}
              />
            </div>
          ))}
        <Grid container spacing={2}>
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
                    <Typography variant="h4" sx={{ fontSize: "2.4rem" }}>
                      Total order:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "2.4rem",
                        color: Style.color.$Money,
                      }}
                    >
                      {formatNumber(order.totalPriceProduct)}
                    </Typography>
                  </Box>
                  <Box sx={boxPrice}>
                    <Typography variant="h4" sx={{ fontSize: "2.4rem" }}>
                      Ship price:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "2.4rem",
                        color: Style.color.$Money,
                      }}
                    >
                      {formatNumber(order.shippingFee)}
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
                      {formatNumber(
                        order.totalPriceProduct + order.shippingFee
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </>
        </Grid>
      </div>
    </div>
  );
}
