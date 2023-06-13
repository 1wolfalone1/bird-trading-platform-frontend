


import { TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddToCartToast, { toastType } from '../../toast/content/AddToCartToast';
import productsPresentationSlices, { filterObjectSelector } from '../../products-presentation/productsPresentationSlice';

export default function OutlineInputCustom({className, fs, line, color="primary", label, lower}) {
   const dispatch = useDispatch();

   const filterObj = useSelector(filterObjectSelector)
   
   const handleLowestPrice = (event) => {
     if(lower){
         const { name, value } = event.target;
         if (value > 10000) {
            toast(<AddToCartToast type={toastType.WARNING_INPUT} msg={"Value cannot be greater than 1000"} />, {
               position: toast.POSITION.TOP_RIGHT,
               autoClose: 1500,
            });
         } else if (value <= 10000) {
            dispatch(productsPresentationSlices.actions.setLowestPrice({ key: "", lowestPrice: value }));
         }
         console.log(value);
      }else {
         const { name, value } = event.target;
         if (value > 1000000000) {
            toast(<AddToCartToast type={toastType.WARNING_INPUT} msg={"Value cannot be greater than 1000000000"} />, {
               position: toast.POSITION.TOP_RIGHT,
               autoClose: 1500,
            });
         } else if (value <= 1000000000) {
            dispatch(productsPresentationSlices.actions.setHighestPrice({ key: "", highestPrice: value }));
         }
      }
   }
  return (
    <div className={className}>
      <TextField
                     sx={{
                        marginTop: '1rem',
                        input: {
                           fontSize: fs,
                        },
                        label: {
                           fontSize: fs,
                        },
                        ".MuiOutlinedInput-notchedOutline legend": {
                           fontSize: line,
                        },
                     }}
                     id="outlined-basic"
                     label={label}
                     variant="outlined"
                     color={color}
                     value={lower ? filterObj.lowestPrice : filterObj.highestPrice}
                     onChange={handleLowestPrice}
                  />
    </div>
  )
}
