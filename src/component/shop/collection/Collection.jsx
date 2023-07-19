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
  const [tag, setTag] = useState();
  const param = useParams();
  const dispatch = useDispatch();
  console.log(param);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [backDrop]);

  useEffect(() => {
    const getTags = async () => {
      try {
        dispatch(globalConfigSlice.actions.changeBackDrops(true));
        const response = await api.get(`tags/shops/${param.id}`);
        const tag = await response.data;
        console.log(tag);
        setTag(tag);
        dispatch(globalConfigSlice.actions.changeBackDrops(false));
      } catch (error) {
        dispatch(globalConfigSlice.actions.changeBackDrops(false));
        console.log(error);
      }
    };
    getTags();
    if (tag) {
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

  const handleViewAll = (tag) => {
    navigate(`/shop/${param.id}/collection/${tag.id}`);
  };

  return (
    <>
      {!loading ? (
        <div className={clsx(s.skeletonContainer)}>
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
          <div className={clsx(s.container)}>
            {tag?.length > 0 ? (
              <Grid container spacing={5} className={s.tag}>
                {tag.map((tag) => (
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
                            fontWeight: "600",
                            color: "rgb(96, 25, 131)",
                          }}
                        >
                          #{tag.tag.name}
                        </Grid>
                        <Grid container spacing={2} className={clsx(s.info)}>
                          {tag.productTagList.map((item) => (
                            <Grid xs={6} sm={6} lg={6} xl={6}>
                              <Grid className={clsx(s.image)}>
                                <img src={item.urlImg} alt="" />
                              </Grid>
                              <Grid className={clsx(s.name)}>{item.name}</Grid>
                            </Grid>
                          ))}
                        </Grid>
                        <Grid className={clsx(s.viewAll)}>
                          <Button
                            onClick={() => {
                              handleViewAll(tag.tag);
                            }}
                          >
                            View all
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div
                style={{
                  color: "red",
                  fontSize: "3.6rem",
                  margin: "5rem auto",
                }}
              >
                There're no tags here!
              </div>
            )}
          </div>
        </Box>
      )}
    </>
  );
}
