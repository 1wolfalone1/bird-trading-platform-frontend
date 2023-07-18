import { Button, Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/server/API";
import s from "./shopOverview.module.scss";
import ButtonChatNow from "../../message/button-chatnow/ButtonChatNow";
import { useSelector } from "react-redux";
import { backDropSelector } from "../../../redux/global/globalConfigSlice";

const cssButton = {
  border: "1px solid #000000",
  padding: "0.5rem 3rem",
  fontSize: "2.4rem",
  fontFamily: "SeoulHangang",
  textTransform: "none",
  color: "rgb(255, 255, 255)",
  backgroundColor: "rgba(188, 188, 188, 0.645)",
  "&:hover": { color: "rgb(4, 0, 30)", backgroundColor: "#e4dfd1" },
};

export default function ShopOverview() {
  const [data, setData] = useState();
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const backDrop = useSelector(backDropSelector);
  const navigate = useNavigate();

  const getShopInfo = async () => {
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
    getShopInfo();
  }, []);

  useEffect(() => {
    setLoading(!backDrop);
  }, [backDrop]);

  const handleCollection = () => {
    navigate(`/shop/${data?.shopInfoDto?.id}/collection`);
  };
  const handlePortfolio = () => {
    navigate(`/shop/${data?.shopInfoDto?.id}/portfolio`);
  };
  const shopInfo = {
    id: data?.shopInfoDto?.id,
    shopName: data?.shopInfoDto?.shopName,
    imgUrl: data?.shopInfoDto?.avatarImgUrl,
  };

  return (
    <>
      {loading ? (
        <Grid container className={clsx(s.container)}>
          <Grid
            sm={7}
            md={7}
            xl={7}
            className={clsx(s.cover)}
            sx={{
              backgroundColor: "lightblue",
              backgroundImage: `url(${
                data?.shopInfoDto?.coverImgUrl ||
                "https://images6.alphacoders.com/117/thumb-1920-1179684.png"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Grid className={clsx(s.aboutShop)}>
              <Grid className={clsx(s.overView)}>
                <Grid className={s.image}>
                  <img
                    src={
                      data?.shopInfoDto?.avatarImgUrl ||
                      "https://static.thenounproject.com/png/5034901-200.png"
                    }
                    alt=""
                  />
                </Grid>
                <Grid className={clsx(s.shop)}>
                  <Grid className={s.shopName}>
                    {data?.shopInfoDto?.shopName}
                  </Grid>
                  <Grid className={clsx(s.chat)}>
                    <ButtonChatNow
                      ButtonOrIcon={Button}
                      shop={shopInfo}
                      css={cssButton}
                      text={"Chat now"}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={clsx(s.action)}>
                <Button onClick={handleCollection}>Collection</Button>
                <Button onClick={handlePortfolio}>Portfolio</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid sm={5} md={5} xl={5} className={clsx(s.information)}>
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
                <Grid className={clsx(s.content)}>{data?.rating}</Grid>
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
      ) : (
        <div className={s.skeletonContainer}>
          <div className={clsx(s.left)}>
            <div className={clsx(s.info)}>
              <div className={clsx(s.shopAvatar)}>
                <Skeleton variant="circular" width={144} height={144} />
              </div>
              <div className={clsx(s.shopName)}>
                <Skeleton variant="text" width={212} height={70} />
                <Skeleton variant="rounded" width={137} height={43} />
              </div>
            </div>
            <div className={clsx(s.action)}>
              <Skeleton variant="rounded" width={160} height={43} />
              <Skeleton variant="rounded" width={160} height={43} />
            </div>
          </div>
          <div className={clsx(s.right)}>
            <div className={clsx(s.l)}>
              <Skeleton variant="text" width={220} height={70} />
              <Skeleton variant="text" width={220} height={70} />
            </div>
            <div className={clsx(s.r)}>
              <Skeleton variant="text" width={220} height={70} />
              <Skeleton variant="text" width={220} height={70} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
