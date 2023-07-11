import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from "./productSuggest.module.scss";
import HomeProductSlider from "../../../component/slider/product/HomeProductSlider";
import { useSelector } from "react-redux";
import { getTopProductsSelector } from "../../home/HomeSlice";
import clsx from "clsx";
import { api } from "../../../api/server/API";
import { Box, CircularProgress, Typography } from "@mui/material";
import ProductHomeCard from "../../../component/card/bird-home-card/ProductHomeCard";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/thumbs";
import { Thumbs } from "swiper";

export default function ProductSuggest() {
  const param = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductSuggestData();
  },[])

  const getProductSuggestData = async() => {
    const productId = param.id;
    
    try {
      setLoading(true);
      const res = await api.get(`products/${productId}/relevant`);
      const data = res.data;
      console.log(data, 'data ne');
      setProducts(data);
      setLoading(false);
    }catch(error) {
      setLoading(false);
      console.log()
      throw error;
    }
  }
  return (
    <>
      <Box className={clsx(s.container)}
      >
        <Typography
        //  font-family: "SeoulHangang";
        //  font-style: normal;
        //  font-weight: 400;
        //  font-size: 5rem;
   
          sx={{textAlign: 'center', marginBottom: '10px', fontSize: '5rem', fontStyle: 'normal', fontWeight: '400', fontFamily: 'SeoulHangang' }}
        >Suggestion
        </Typography> 
        {/* <div className={clsx(s.content)}> */}
        {loading ? 
          <CircularProgress />
          :
          <Swiper
              spaceBetween={"0rem"}
              slidesPerView={4.5}
              modules={[Thumbs]}
              watchSlidesProgress
              onSlideChange={() => {}}
              onSwiper={(swiper) => {}}
            >
              {products && products?.map(product => (
                
                <SwiperSlide key={product.id}>
                    <ProductHomeCard product={product} isSuggest={true} />
                </SwiperSlide>
              
            ))}
          </Swiper>
        }    
        {/* </div> */}
      </Box>
    </>
  );
}
