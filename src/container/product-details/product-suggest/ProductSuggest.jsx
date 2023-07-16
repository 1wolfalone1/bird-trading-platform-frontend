import { Box, CircularProgress, Typography } from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { api } from "../../../api/server/API";
import ProductHomeCard from "../../../component/card/bird-home-card/ProductHomeCard";
import s from "./productSuggest.module.scss";

export default function ProductSuggest() {
  const param = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductSuggestData();
  }, []);

  const getProductSuggestData = async () => {
    const productId = param.id;

    try {
      setLoading(true);
      const res = await api.get(`products/${productId}/relevant`);
      const data = res.data;
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  return (
    <>
      <Box className={clsx(s.container)}>
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "5rem",
            fontStyle: "normal",
            fontWeight: "400",
            fontFamily: "SeoulHangang",
          }}
        >
          Suggestion
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Swiper
            spaceBetween={"0rem"}
            slidesPerView={4.5}
            modules={[Thumbs]}
            watchSlidesProgress
            onSlideChange={() => {}}
            onSwiper={(swiper) => {}}
          >
            {products &&
              products?.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductHomeCard product={product} isSuggest={true} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </Box>
    </>
  );
}
