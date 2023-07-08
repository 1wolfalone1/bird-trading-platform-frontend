import { Box, Pagination, Rating } from "@mui/material";
import clsx from "clsx";
import React, { useState } from "react";
import s from "./rate.module.scss";
import { useDispatch, useSelector } from "react-redux";
import rateProductDetailSlice, { getListReivewBaseOnProductId, rateProductDetailSliceSelector } from "./rateProductDetailSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import { RemoveCircle, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import ReviewInRate from "./review-in-rate/ReviewInRate";

const ratings = [
  {
    id: 1,
    userName: "Buck",
    avatar:
      "https://pagesunbound.files.wordpress.com/2012/03/call-of-the-wild.jpg",
    timeOfRating: 1687693663211,
    star: 2,
    review: "Good product, ship fast and shipper friendly",
  },
  {
    id: 2,
    userName: "John",
    avatar:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    timeOfRating: 1687693683222,
    star: 4,
    review: "Excellent service and high-quality products",
  },
  {
    id: 3,
    userName: "Alice",
    avatar:
      "https://st3.depositphotos.com/1064024/14272/i/450/depositphotos_142722813-stock-photo-heart-love-tree.jpg",
    timeOfRating: 1687693993233,
    star: 5,
    review: "Impressed with the quick delivery and great customer support",
  },
  // Add more rating objects as needed
  {
    id: 4,
    userName: "Jane",
    avatar:
      "https://i.pinimg.com/222x/a9/67/91/a96791a3c302f73450f8db4c39bb0a5b.jpg",
    timeOfRating: 1687694663244,
    star: 3.5,
    review: "Decent product, but could use improvement in packaging",
  },
  {
    id: 5,
    userName: "Mike",
    avatar:
      "https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg",
    timeOfRating: 1687695663255,
    star: 1,
    review: "Disappointed with the product quality and slow shipping",
  },
];

export default function Rate() {
  const dispatch = useDispatch();
  const param = useParams();
  const {totalPageNumber, rateData, currentPageNumber} = useSelector(rateProductDetailSliceSelector);
  const [selectPic, setSelectPic] = useState('');

  useEffect(() => {
    const productId = param.id;
    dispatch(getListReivewBaseOnProductId(productId));
  },[currentPageNumber])

  const handlePagingReivew = (e, value) => {
    dispatch(rateProductDetailSlice.actions.changeCurrentPagereivew(value));
  }

  return (
    <>
      <div className={clsx(s.container)}>
        <div className={clsx(s.cover)}>
          <div className={clsx(s.title)}>
            <h3>Review:</h3>
          </div>
          {rateData && rateData.length > 0 ? (
            rateData.map((rating) => (
              <ReviewInRate rating={rating} />
            ))
          ) : (
            <Box sx={{marginL: 'auto', textAlign: 'center'}}>
              <img src='https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/i_want_your_feedback.png' width='300px' />
            </Box>
          )}   
        <Pagination count={totalPageNumber} shape="rounded" onClick={handlePagingReivew}/>
        </div>
      </div>
    </>
  );
}
