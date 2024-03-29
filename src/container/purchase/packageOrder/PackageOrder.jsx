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
import { backDropSelector } from "../../../redux/global/globalConfigSlice";
import { useSelector } from "react-redux";

export default function PackageOrder() {
  const [packageOrders, setPackageOrders] = useState(null);
  const [totalPage, setToltalPage] = useState();
  const [loading, setLoading] = useState(false);
  const backDrop = useSelector(backDropSelector);
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(!backDrop);
    }, 500);
  }, [backDrop]);

  const handleChangePage = (e, value) => {
    setPageNumber(value);
  };

  return (
    <div className={clsx(s.container)}>
      {packageOrders ? (
        <>
          {!loading ? (
            <div className={clsx(s.skeleton)}>
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  variant="rectangular"
                  height={147}
                  width={1206}
                  animation="wave"
                />
              ))}
            </div>
          ) : (
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
                    src="https://img.freepik.com/premium-photo/3d-parcel-order-delivery-concept-return-parcel-courier-shipment-checklist-3d-rendering-illustration_696265-567.jpg"
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
                    Shipping Total:{" "}
                    <span>{formatNumber(data.shippingFee)}</span>
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
          )}
        </>
      ) : (
        <>
          {!loading ? (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  variant="rectangular"
                  height={160}
                  width={1400}
                  animation="wave"
                />
              ))}
            </>
          ) : (
            <div className={clsx(s.emptyPackageOrders)}>
              <span>You haven't any packages yet</span>
            </div>
          )}
        </>
      )}
      {packageOrders ? (
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
      ) : (
        <></>
      )}
    </div>
  );
}
