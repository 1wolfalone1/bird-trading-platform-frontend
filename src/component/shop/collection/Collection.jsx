import React from "react";
import s from "./collection.module.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "../../../api/server/API";
import { useEffect } from "react";
import clsx from "clsx";
import { Box, Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch } from "react-redux";
import globalConfigSlice from "../../../redux/global/globalConfigSlice";

export default function Collection() {
  // const [data, setData] = useState();
  const [product, setProduct] = useState();
  const param = useParams();
  const dispatch = useDispatch();
  console.log(param);
  // const getCollection = async () => {
  //   try {
  //     const response = await api.get(`shop-info?id=${param.id}`);
  //     const data = await response.data;
  //     console.log(data);
  //     setData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getCollection();
  // }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch(globalConfigSlice.actions.changeBackDrops(true));
        const response = await api.get(`/products/${param.id}`);
        const data = await response.data;
        console.log(data);
        setProduct(data);
        dispatch(globalConfigSlice.actions.changeBackDrops(false));
      } catch (error) {
        dispatch(globalConfigSlice.actions.changeBackDrops(false));
        console.log(error);
      }
    };
    getProducts();
    if (product) {
      //    const root = ReactDOM.createRoot(document.getElementById("content"));
      //    root.render();
    }
  }, [param]);

  const handleClick = (tagId) => {};

  return (
    <Box sx={{ width: "100%", padding: "5rem 0" }}>
      <Typography
        variant="h2"
        fullWidth
        sx={{
          textAlign: "center",
          color: "rgb(96, 25, 131)",
          fontWeight: "800",
          fontFamily: "SeoulHangang",
          marginBottom: "5rem",
        }}
      >
        Welcome to {product?.product?.shopOwner?.shopName}
      </Typography>
      <Typography
        variant="h4"
        fullWidth
        sx={{
          color: "rgb(96, 25, 131)",
          fontWeight: "600",
          fontFamily: "SeoulHangang",
          marginLeft: "10rem",
        }}
      >
        Select the tag you want to find:
      </Typography>
      <div className={clsx(s.container)}>
        {product?.product?.tags.length > 0 && (
          <div className={s.tag}>
            {product.product.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={`#${tag.name}`}
                sx={{
                  fontSize: "2.4rem",
                  color: "rgb(30, 0, 7)",
                  padding: "3rem",
                }}
                onClick={() => {
                  handleClick(tag.id);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Box>
  );
}
