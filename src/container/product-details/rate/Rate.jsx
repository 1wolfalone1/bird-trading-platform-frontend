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

export default function Rate() {
  const dispatch = useDispatch();
  const param = useParams();
  const {totalPageNumber, rateData, currentPageNumber} = useSelector(rateProductDetailSliceSelector);
  const [selectPic, setSelectPic] = useState('');

  useEffect(() => {
    const productId = param.id;
    dispatch(getListReivewBaseOnProductId(productId));
  },[currentPageNumber, param])

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
              <ReviewInRate rating={rating} key={rating.id}/>
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
