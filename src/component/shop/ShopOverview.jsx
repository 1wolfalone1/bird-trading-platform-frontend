import React, { useEffect, useState } from "react";
import clsx from "clsx";
import s from "./shopOverview.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, IconButton } from "@mui/material";
import SmsIcon from "@mui/icons-material/Sms";
import { api } from "../../api/server/API";
import { useNavigate } from "react-router-dom";

export default function ShopOverview() {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const getShopInfo = async () => {
    try {
      const response = await api.get(`shop-info?id=${1}`);
      const data = await response.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getShopInfo();
  }, []);

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
                <IconButton>
                  <SmsIcon
                    sx={{ fontSize: "6rem", backgroundColor: "transparent" }}
                    color={"Complementary8"}
                    // onClick={() => handleChatNow(product.product.shopOwner)}
                  />
                </IconButton>
                <Grid className={s.shopName}>
                  {data?.shopInfoDto?.shopName}
                </Grid>
              </Grid>
            </Grid>
            <Grid className={clsx(s.action)}>
              <Button>All Product</Button>
              <Button>Collection</Button>
              <Button>Portfolio</Button>
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
