import React from "react";
import clsx from "clsx";
import s from "./packageOrder.module.scss";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect } from "react";
import { api } from "../../../api/server/API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../utils/myUtils";
import { Skeleton } from "@mui/material";
import { Box, Pagination } from "@mui/material";

export default function PackageOrder() {
  const [packageOrders, setPackageOrders] = useState(null);
  const [totalPage, setToltalPage] = useState();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);

  const getPackageOrders = async () => {
    try {
      const response = await api.get("/package-order/view-all-package-order", {
        params: { pageNumber: pageNumber },
      });
      const packages = await response.data;
      setPackageOrders(packages);
      setToltalPage(packages.pageNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackageOrders();
  }, [pageNumber]);

  const handleChangePage = (e, value) => {
    setPageNumber(value);
  };

  return (
    <div className={clsx(s.container)}>
      {packageOrders ? (
        packageOrders.lists.map((data) => (
          <Grid2
            container
            spacing={2}
            className={clsx(s.packageOrder)}
            key={data.id}
            onClick={() => navigate(`/order-status/${data.id}`)}
          >
            <Grid2 sm={2} md={2} xl={2} className={clsx(s.image)}>
              <img
                src="https://cdn3.iconfinder.com/data/icons/e-commerce-vol-interactions/80/package-order-ready-checkmark-512.png"
                alt="package"
              />
            </Grid2>
            <Grid2 sm={6} md={6} xl={6} className={clsx(s.info)}>
              <Grid2 className={clsx(s.address)}>
                Delivery address: <span>{data.address}</span>
              </Grid2>
              <Grid2 className={clsx(s.paymentMethod)}>
                Payment method:{" "}
                <span>
                  {data.paymentMethod === "DELIVERY"
                    ? "Cash on delivery (COD)"
                    : "PayPal"}
                </span>
              </Grid2>
              <Grid2 className={clsx(s.dateOrder)}>
                Date order:{" "}
                <span>
                  {new Date(data.createdDate).toLocaleString("en-GB")}
                </span>
              </Grid2>
            </Grid2>
            <Grid2 sm={4} md={4} xl={4} className={clsx(s.price)}>
              <Grid2 className={clsx(s.subTotal)}>
                Merchandise Subtotal:{" "}
                <span>{formatNumber(data.totalPriceProduct)}</span>
              </Grid2>
              <Grid2 className={clsx(s.shipping)}>
                Shipping Total: <span>{formatNumber(data.shippingFee)}</span>
              </Grid2>
              <Grid2 className={clsx(s.discount)}>
                Promotion:<span>-{formatNumber(data.discount)}</span>
              </Grid2>
              <Grid2 className={clsx(s.total)}>
                Total bill: <span>{formatNumber(data.totalPayment)}</span>
              </Grid2>
            </Grid2>
          </Grid2>
        ))
      ) : (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton variant="rectangular" height={143} animation="wave" />
          ))}
        </>
      )}
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          fontSize: "6rem",
        }}
        className={clsx(s.pagingStyle)}
      >
        <Pagination
          count={totalPage}
          variant="outlined"
          shape="rounded"
          size="large"
          color="Dominant0"
          onChange={handleChangePage}
        />
      </Box>
    </div>
  );
}
