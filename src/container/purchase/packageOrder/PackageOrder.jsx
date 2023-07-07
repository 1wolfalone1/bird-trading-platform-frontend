import React from "react";
import clsx from "clsx";
import s from "./packageOrder.module.scss";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect } from "react";
import { api } from "../../../api/server/API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../utils/myUtils";

const packages = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1688053793446-197dbc86e237?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    deliveryAddress: "Hoàng Hữu Nam, Quận 9, Thành phố Hồ Chí Minh, Việt Nam",
    paymentMethod: "Cash on delivery (COD)",
    dateOrder: "3/7/2023",
    merchandiseSubtotal: "$10.00",
    shippingTotal: "$2.00",
    promotion: "$.00",
    total: "$12.00",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1688053793446-197dbc86e237?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    deliveryAddress: "Hoàng Hữu Nam, Quận 9, Thành phố Hồ Chí Minh, Việt Nam",
    paymentMethod: "Cash on delivery (COD)",
    dateOrder: "3/7/2023",
    merchandiseSubtotal: "$10.00",
    shippingTotal: "$2.00",
    promotion: "$.00",
    total: "$12.00",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1688053793446-197dbc86e237?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    deliveryAddress: "Hoàng Hữu Nam, Quận 9, Thành phố Hồ Chí Minh, Việt Nam",
    paymentMethod: "Cash on delivery (COD)",
    dateOrder: "3/7/2023",
    merchandiseSubtotal: "$10.00",
    shippingTotal: "$2.00",
    promotion: "$.00",
    total: "$12.00",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1688053793446-197dbc86e237?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    deliveryAddress: "Hoàng Hữu Nam, Quận 9, Thành phố Hồ Chí Minh, Việt Nam",
    paymentMethod: "Cash on delivery (COD)",
    dateOrder: "3/7/2023",
    merchandiseSubtotal: "$10.00",
    shippingTotal: "$2.00",
    promotion: "$.00",
    total: "$12.00",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1688053793446-197dbc86e237?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    deliveryAddress: "Hoàng Hữu Nam, Quận 9, Thành phố Hồ Chí Minh, Việt Nam",
    paymentMethod: "Cash on delivery (COD)",
    dateOrder: "3/7/2023",
    merchandiseSubtotal: "$10.00",
    shippingTotal: "$2.00",
    promotion: "$.00",
    total: "$12.00",
  },
];

export default function PackageOrder() {
  const [packageOrders, setPackageOrders] = useState();
  const navigate = useNavigate();

  const getPackageOrders = async () => {
    try {
      const response = await api.get(
        "/package-order/view-all-package-order?pageNumber=1"
      );
      console.log(response);
      const packages = await response.data;
      console.log(packages);
      setPackageOrders(packages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackageOrders();
  }, []);

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
        <div className={clsx(s.emptyPackageOrders)}>
          You haven't any package orders
        </div>
      )}
    </div>
  );
}
