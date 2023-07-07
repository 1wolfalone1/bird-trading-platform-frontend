import { RemoveCircleOutlineOutlined } from '@mui/icons-material';
import { Box, Rating } from '@mui/material';
import React, { useState } from 'react';
import s from './reviewInRate.module.scss';
import clsx from 'clsx';
import moment from 'moment';

const ReviewInRate = ({rating}) => {
    const [selectPic, setSelectPic] = useState('');
  return (
    <div className={clsx(s.detail)}>
        <div className={clsx(s.customer)}>
        <div className={clsx(s.image)}>
            <img src={rating?.account.imgUrl} alt="" />
        </div>
        <div className={clsx(s.right)}>
            <div className={clsx(s.userName)}>
            <span>{rating?.account.fullName}</span>
            </div>
            <div className={clsx(s.star)}>
            <Rating value={rating.rating} readOnly precision={0.5} />
            </div>
        </div>
        </div>
        <div className={clsx(s.timeOfRating)}>
        {moment(rating?.reviewDate).format("DD/MM/YY HH:mm")}
        </div>
        <div className={clsx(s.content)}  dangerouslySetInnerHTML={{ __html: rating?.description }} ></div>
        <Box 
        sx={{boxShadow: '0px 0px 10px #33333'}}
        >
            {rating?.imgUrl && rating.imgUrl.map(img =>
                <img src={img} className={clsx(s.imgReview)} onClick={() => setSelectPic(img)}/>
            ) }
        </Box>
        {selectPic && 
        <Box 
            sx={{position: 'relative'
            , width: 'fit-content'
            }}
        >
            <img src={selectPic} height='400px'/>
            <RemoveCircleOutlineOutlined 
            color="error"
            sx={{position: 'absolute',
            top:'0',
            right: '0',
            fontSize: '4rem'
            }}
            onClick={() => setSelectPic('')}
            />
        </Box>
        }
    </div>
  )
}

export default ReviewInRate