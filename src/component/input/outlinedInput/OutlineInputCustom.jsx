import { TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddToCartToast, { toastType } from "../../toast/content/AddToCartToast";
import productsPresentationSlices, {
  filterObjectSelector,
} from "../../products-presentation/productsPresentationSlice";

export default function OutlineInputCustom({
  className,
  fs,
  line,
  color = "primary",
  label,
  lower,
}) {
  const dispatch = useDispatch();

  const filterObj = useSelector(filterObjectSelector);

  const handleLowestPrice = (event) => {
    const { name, value } = event.target;
      var number = 0;
      console.log("test thu ", value !== "")
      if (value >= 0) {
        number = value;
      }
    if (lower) {     
      
      if (number > 10000) {
        
        toast(
          <AddToCartToast
            type={toastType.WARNING_INPUT}
            msg={"Value cannot be greater than 9.000$"}
          />,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          }
        );
      } else if (number <= 10000) {
        console.log('here is and number', number)
        dispatch(
          productsPresentationSlices.actions.setLowestPrice({
            key: "",
            lowestPrice: number,
          })
        );
      }
      console.log(value);
    } else {
      if (number > 10000000) {
        toast(
          <AddToCartToast
            type={toastType.WARNING_INPUT}
            msg={"Value cannot be greater than 10.000.000$"}
          />,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          }
        );
      } else if (number <= 1000000000) {
        dispatch(
          productsPresentationSlices.actions.setHighestPrice({
            key: "",
            highestPrice: number,
          })
        );
      }
    }
  };
  return (
    <div className={className}>
      <TextField
        InputProps={{
          inputProps: {
            min: 0, // Replace 0 with your desired minimum value
          },
        }}
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
        value={lower ? filterObj.lowestPrice : filterObj.highestPrice}
        onChange={handleLowestPrice}
      />
    </div>
  );
}
