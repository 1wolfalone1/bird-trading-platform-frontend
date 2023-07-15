import { Box, Button, Chip, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/server/API";
import globalConfigSlice, {
  backDropSelector,
} from "../../../redux/global/globalConfigSlice";
import s from "./collection.module.scss";

export default function Collection() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const backDrop = useSelector(backDropSelector);
  const [product, setProduct] = useState();
  const param = useParams();
  const dispatch = useDispatch();
  console.log(param);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [backDrop]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch(globalConfigSlice.actions.changeBackDrops(true));
        const response = await api.get(`tags/shops/${param.id}`);
        const product = await response.data;
        console.log(product);
        setProduct(product);
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

  const getCollection = async () => {
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
    getCollection();
  }, []);

  const handleViewAll = (tagId) => {
    // navigate(`shop/:id/collection/:${tagId}`);
  };

  return (
    <>
      {!loading ? (
        <div className={s.skeletonContainer}>
          <div className={clsx(s.header)}>
            <Skeleton variant="rectangular" width={360} height={45} />
          </div>
          <div className={clsx(s.content)}></div>
        </div>
      ) : (
        <Box sx={{ width: "100%", padding: "5rem 0" }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              color: "rgb(96, 25, 131)",
              fontWeight: "800",
              fontFamily: "SeoulHangang",
              marginBottom: "5rem",
            }}
          >
            Welcome to {data?.shopInfoDto?.shopName}
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
            {product?.length > 0 && (
              <Grid container spacing={5} className={s.tag}>
                {product.map((tag) => (
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    lg={4}
                    xl={4}
                    key={tag.id}
                    className={clsx(s.item)}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgb(255, 255, 255)",
                        color: "black",
                        borderRadius: "0.2rem",
                        fontFamily: "SeoulHangang",
                      }}
                      className={clsx(s.content)}
                    >
                      <Grid
                        className={clsx(s.itemDetail)}
                        sx={{ padding: "1rem" }}
                      >
                        <Grid
                          className={clsx(s.header)}
                          sx={{
                            fontSize: "3rem",
                          }}
                        >
                          #{tag.name}
                        </Grid>
                        <Grid container spacing={2} className={clsx(s.info)}>
                          <Grid xs={6} sm={6} lg={6} xl={6}>
                            <Grid className={clsx(s.image)}>
                              <img
                                src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/7d4ab433-0c2f-4724-8154-e2f8ab332d06.png"
                                alt=""
                              />
                            </Grid>
                            <Grid className={clsx(s.name)}>Name products</Grid>
                          </Grid>
                          <Grid xs={6} sm={6} lg={6} xl={6}>
                            <Grid className={clsx(s.image)}>
                              <img
                                src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/26.jpg"
                                alt=""
                              />
                            </Grid>
                            <Grid className={clsx(s.name)}>Name products</Grid>
                          </Grid>
                        </Grid>
                        <Grid className={clsx(s.viewAll)}>
                          <Button onClick={handleViewAll(tag.id)}>
                            View all
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </Box>
      )}
    </>
  );
}
