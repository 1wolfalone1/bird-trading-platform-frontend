import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/server/API";
import Action from "../../../component/purchase/order-status/header/action/Action";
import StatusNavbar from "../../../component/purchase/order-status/header/status/StatusNavbar";
import Order from "../order/Order";
import s from "./orderStatus.module.scss";

export default function OrderStatus() {
  const param = useParams();
  console.log(param);
  const [orders, setOrders] = useState();

  const getOrders = async () => {
    try {
      const response = await api.get(`orders?packageOrderId=${param.id}`);
      console.log(response);
      const orders = await response.data;
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  console.log('day la order', orders)
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.packageOrder)}>
        {orders ? (
          orders.map((order) => (
            <div className={clsx(s.order)} key={order.id}>
              <StatusNavbar status={order.orderStatus} />
              <Order order={order} key={orders.orderId}  />
              <Action
                shopOwner={order.shopOwner}
                status={order.orderStatus}
                order={order.orderDetails}
                orderId = {order.orderId}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
