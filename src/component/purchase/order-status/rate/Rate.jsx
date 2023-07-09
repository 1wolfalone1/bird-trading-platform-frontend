import { LoadingButton } from "@mui/lab";
import { Button, IconButton } from "@mui/material";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../../../api/server/API";
import ItemRate from "./item-rate/ItemRate";
import s from "./rate.module.scss";
import { Close, Remove } from "@mui/icons-material";
import { getListReivewBaseOnOrderDetail, rateSliceSelector } from "./rateSlice";

export default function Rate({ order, close, orderId }) {
  const dipatch = useDispatch();
  const { listReivew } = useSelector(rateSliceSelector);

  useEffect(() => {
    dipatch(getListReivewBaseOnOrderDetail(orderId));
  }, []);
  console.log('here is list review', listReivew);
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.header)}>
        <div className={clsx(s.title)}>Rate Products</div>
        <div className={clsx(s.closeButton)}>
          <button onClick={close}>&times;</button>
        </div>
      </div>
      <div className={clsx(s.products)}>
        {order &&
          order.map((item) => {
            
              const  exists = listReivew.find(
                (review) => review.productId === item.productId
              );
              
            var initialValues = {
              description: "",
              ratings: 5,
            };

            if (exists) {
              initialValues = {
                description: exists.description,
                ratings: exists.rating,
              };
            }
            return exists ? (
              <ItemRate
                item={item}
                isHaveValue={true}
                initialValues={initialValues}
                listImage={exists?.imgUrl}
                orderId={orderId}
              />
            ) : (
              <ItemRate
                item={item}
                isHaveValue={false}
                initialValues={initialValues}
                orderId={orderId}
              />
            );
          })}
      </div>
    </div>
  );
}
