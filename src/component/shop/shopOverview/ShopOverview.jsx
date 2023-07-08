import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/server/API";
import s from "./shopOverview.module.scss";
import ButtonChatNow from "../../message/button-chatnow/ButtonChatNow";

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

  const handleAllProducts = () => {};
  const handleCollection = () => {};
  const handlePortfolio = () => {};

  return (
    <>
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
                    shop={data?.shopInfoDto}
                    css={cssButton}
                    text={"Chat now"}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid className={clsx(s.action)}>
              <Button onClick={handleAllProducts}>All products</Button>
              <Button onClick={handleCollection}>Collection</Button>
              <Button onClick={handlePortfolio}>Portfolio</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid sm={5} md={5} xl={5} className={clsx(s.information)}>
          <Grid className={clsx(s.left)}>
            <Grid className={clsx(s.products)}>
              Products: {data?.totalProduct}
            </Grid>
            <Grid className={clsx(s.sold)}>
              Sold: {data?.totalProductOrder}
            </Grid>
          </Grid>
          <Grid className={clsx(s.right)}>
            <Grid className={clsx(s.rating)}>
              Rating: star{data?.shopInfoDto?.rating}(
              {data?.shopInfoDto?.rating} Rating)
            </Grid>
            <Grid className={clsx(s.joined)}>
              Joined:{" "}
              {new Date(data?.shopInfoDto?.createdDate).toLocaleDateString(
                "en-GB"
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
