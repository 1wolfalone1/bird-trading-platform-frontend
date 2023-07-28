import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddToCartToast, { toastType } from "../../toast/content/AddToCartToast";
import productsPresentationSlices, {
  filterObjectSelector, productsPresentationSlicesSelector,
} from "../../products-presentation/productsPresentationSlice";
import { useEffect } from "react";

export default function OutlineInputCustom({
  className,
  fs,
  line,
  color = "primary",
  label,
  lower,
  setValueRating
}) {
  const dispatch = useDispatch();

  const filterObj = useSelector(filterObjectSelector);

  const {isResetPrice} = useSelector(productsPresentationSlicesSelector)

  const [number, setNumber] = useState(lower ? filterObj.lowestPrice : filterObj.highestPrice);

  useEffect( () => {
    setNumber(0);
  },[isResetPrice])

  const handleLowestPrice = (event) => {
    setValueRating(0);
    const { name, value } = event.target;
    console.log('here is value', value);
    if (lower) {         
      if (value > 10000) {
        
        toast(
          <AddToCartToast
            type={toastType.WARNING_INPUT}
            msg={"Value cannot be more than 4 digits!"}
          />,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          }
        );
      } else if (value <= 10000) {
        setNumber(value);
        dispatch(
          productsPresentationSlices.actions.setLowestPrice({
            key: "",
            lowestPrice: value,
          })
        );
      }
    } else {
      if (value > 1000000) {
        toast(
          <AddToCartToast
            type={toastType.WARNING_INPUT}
            msg={"Value cannot be more than 6 digits!"}
          />,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          }
        );
      } else if (value <= 1000000000) {
        setNumber(value);
        dispatch(
          productsPresentationSlices.actions.setHighestPrice({
            key: "",
            highestPrice: value,
          })
        );
      }
    }
    
  };

  return (
    <div className={className}>
      <TextField
        defaultValue={0}
        sx={{
          marginTop: "1rem",
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
        value={number}
        onChange={handleLowestPrice}
      />
    </div>
  );
}
