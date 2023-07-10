import { Cancel } from '@mui/icons-material';
import { Box, IconButton, Rating } from '@mui/material';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useState } from 'react';
import s from './reviewInRate.module.scss';
const ReviewInRate = ({rating}) => {
    const [selectPic, setSelectPic] = useState('');
  return (
    <motion.div className={clsx(s.detail)}
        initial={{y: '-100%', opacity: 0}}
        animate={{y: 0, opacity: 1,  transition: { duration: 0.2, delay: 0, type: 'tween' }}}
    >
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
        <motion.div
            initial={{x: '-100%', opacity: 0}}
            animate={{x: 0, opacity: 1,  transition: { duration: 0.2, delay: 0, type: 'tween' }}}
       
        >
            <Box 
            sx={{position: 'relative'
            , width: 'fit-content'
            }}
        >
            <img src={selectPic} height='400px'/>
            <IconButton
                variant="contained"
                 sx={{position: 'absolute',
                 top:'0',
                 right: '0',
                 fontSize: '4rem',
                 backgroundColor: "#3333339e",
                 padding: '0',
                 '&:hover': {
                    backgroundColor: '#fff'
                 }
                }
             }
            >
                <Cancel 
                    sx={{fontSize: '4rem',
                     color: '#ffff',
                     '&:hover': {
                        color:  "#3333339e",
                     }
                    }}
                onClick={() => setSelectPic('')}
                />
            </IconButton>
            </Box>
        </motion.div>
        }
    </motion.div>
  )
}

export default ReviewInRate