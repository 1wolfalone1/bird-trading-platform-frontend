import React from "react";
import s from "./portfolio.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/server/API";
import { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { backDropSelector } from "../../../redux/global/globalConfigSlice";

export default function Portfolio() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const backDrop = useSelector(backDropSelector);
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [backDrop]);

  return (
    <>
      {!loading ? (
        <div className={s.skeletonContainer}>
          <div className={clsx(s.header)}>
            <Skeleton variant="rectangular" width={360} height={45} />
          </div>
          <div className={clsx(s.content)}>
            <div className={clsx(s.left)}>
              <div className={clsx(s.image)}>
                <Skeleton variant="rounded" width={528} height={288} />
                <div className={clsx(s.avatar)}>
                  <Skeleton variant="circular" width={112} height={112} />
                </div>
              </div>
              <div className={clsx(s.info)}>
                <div className={clsx(s.l)}>
                  <Skeleton variant="rectangular" width={200} height={30} />
                  <Skeleton variant="rectangular" width={200} height={30} />
                </div>
                <div className={clsx(s.r)}>
                  <Skeleton variant="rectangular" width={200} height={30} />
                  <Skeleton variant="rectangular" width={200} height={30} />
                </div>
              </div>
            </div>
            <div className={clsx(s.right)}>
              <Skeleton variant="rounded" width={690} height={288} />
            </div>
          </div>
        </div>
      ) : (
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
                    <Grid className={clsx(s.content)}>
                      {data?.totalProduct}
                    </Grid>
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
                    <Grid className={clsx(s.content)}>{data?.rating}</Grid>
                  </Grid>
                  <Grid className={clsx(s.joined)}>
                    <Grid className={clsx(s.title)}>Joined:</Grid>
                    <Grid className={clsx(s.content)}>
                      {new Date(
                        data?.shopInfoDto?.createdDate
                      ).toLocaleDateString("en-GB")}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              sm={20}
              md={20}
              lg={20}
              xl={11}
              className={clsx(s.description)}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    data?.shopInfoDto?.description ||
                    ` There is currently no description for ${data?.shopInfoDto.shopName}`,
                }}
                style={{
                  boxShadow: "0.8rem 0.8rem 3rem 0.2rem gray",
                  borderRadius: "1rem",
                  padding: "1rem 3rem",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
