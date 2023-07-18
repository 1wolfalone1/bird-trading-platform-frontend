import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../api/server/API";
import globalConfigSlice, {
  backDropSelector,
} from "../../../../redux/global/globalConfigSlice";
import s from "./tag.module.scss";
import { Box, Skeleton, Typography } from "@mui/material";
import ProductCard from "../../../card/product-card/ProductCard";

export default function Tag() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [tagName, setTagName] = useState();
  const backDrop = useSelector(backDropSelector);
  const param = useParams();
  console.log(param);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const handleView = (id) => {
  //     navigate(`/product/${id}`);
  //   };
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [backDrop]);

  useEffect(() => {
    const getTags = async () => {
      try {
        dispatch(globalConfigSlice.actions.changeBackDrops(true));
        const response = await api.get(
          `/products?tagid=${param.tagId}&shopid=${param.id}`
        );
        const data = await response.data;
        console.log("data", data);
        setData(data);

        const foundTag = data[0]?.tags;
        const tag = foundTag.find(
          (tag) => String(tag.id) === String(param.tagId)
        );
        const nameTag = tag ? tag.name : "Tag not found";
        setTagName(nameTag);

        console.log(nameTag);
        dispatch(globalConfigSlice.actions.changeBackDrops(false));
      } catch (error) {
        dispatch(globalConfigSlice.actions.changeBackDrops(false));
        console.log(error);
      }
    };
    getTags();
  }, [param]);

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
            #{tagName}
          </Typography>
          <div className={clsx(s.container)}>
            {data?.length > 0 && (
              <Grid
                container
                spacing={5}
                marginRight={4}
                marginLeft={4}
                marginTop={1}
                marginBottom={1}
                className={s.tag}
              >
                {data.map((item) => (
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    lg={3}
                    xl={3}
                    key={item.id}
                    className={clsx(s.item)}
                  >
                    <ProductCard product={item} />
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
