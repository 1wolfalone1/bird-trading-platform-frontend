import React from "react";
import s from "./portfolio.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/server/API";
import { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Avatar, Box, Typography } from "@mui/material";

export default function Portfolio() {
  const [data, setData] = useState();
  const param = useParams();
  console.log(param);
  const getPortfolio = async () => {
    try {
      const response = await api.get(`shop-info?id=${param.id}`);
      const data = await response.data;
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <Box sx={{ width: "100%", padding: "5rem" }}>
      <Typography
        variant="h2"
        fullWidth
        sx={{
          textAlign: "center",
          color: "rgb(96, 25, 131)",
          fontWeight: "800",
          fontFamily: "SeoulHangang",
        }}
      >
        Welcome to {data?.shopInfoDto?.shopName}
      </Typography>
      <Grid container columns={20} className={clsx(s.container)}>
        <Grid sm={20} md={20} lg={20} xl={8} className={clsx(s.left)}>
          <Grid className={clsx(s.image)}>
            <Box
              fullWidth
              sx={{
                backgroundImage: `url(${
                  data?.shopInfoDto?.coverImgUrl ||
                  "https://images6.alphacoders.com/117/thumb-1920-1179684.png"
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                filter: "brightness(0.9)",
                height: "36rem",
                width: "66rem",
                borderRadius: "1rem",
              }}
              className={clsx("box-shadow")}
            ></Box>
            <Box
              sx={{
                position: "absolute",
                height: "14rem",
                width: "14rem",
                transform: "translate(20%, -50%)",
              }}
            >
              <Avatar
                className={clsx("box-shadow")}
                src={
                  data?.shopInfoDto?.avatarImgUrl ||
                  "https://static.thenounproject.com/png/5034901-200.png"
                }
                alt=""
                sx={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
          <Grid className={clsx(s.info)}>
            <Grid className={clsx(s.left)}>
              <Grid className={clsx(s.products)}>
                <Grid className={clsx(s.title)}>Products:</Grid>
                <Grid className={clsx(s.content)}>{data?.totalProduct}</Grid>
              </Grid>
              <Grid className={clsx(s.sold)}>
                <Grid className={clsx(s.title)}>Sold:</Grid>
                <Grid className={clsx(s.content)}>
                  {data?.totalProductOrder}
                </Grid>
              </Grid>
            </Grid>
            <Grid className={clsx(s.right)}>
              <Grid className={clsx(s.rating)}>
                <Grid className={clsx(s.title)}>Rating:</Grid>
                <Grid className={clsx(s.content)}>
                  star{data?.rating}({data?.rating} Rating)
                </Grid>
              </Grid>
              <Grid className={clsx(s.joined)}>
                <Grid className={clsx(s.title)}>Joined:</Grid>
                <Grid className={clsx(s.content)}>
                  {new Date(data?.shopInfoDto?.createdDate).toLocaleDateString(
                    "en-GB"
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid sm={20} md={20} lg={20} xl={11} className={clsx(s.description)}>
          <div
            dangerouslySetInnerHTML={{
              __html:
                data?.shopInfoDto?.description ||
                ` There is currently no description for ${data?.shopInfoDto.shopName}`,
            }}
            style={{
              boxShadow: "0.8rem 0.8rem 3rem 0.2rem gray",
              borderRadius: "0.5rem",
              padding: "1rem 3rem",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
