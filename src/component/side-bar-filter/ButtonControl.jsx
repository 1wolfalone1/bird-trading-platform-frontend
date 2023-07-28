import { Button } from "@mui/material";
import React from "react";
import s from "./sideBarFIlter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import productsPresentationSlices, {
  filterByAll,
  productTypeSelector,
  resetListTypeProduct,
} from "../products-presentation/productsPresentationSlice";

export default function ButtonControl({ setListSlected, isType, setValueRating }) {
  const dispatch = useDispatch();

  const resetList = () => {
    dispatch(
        productsPresentationSlices.actions.setStar({ key: "", star: 0 })
      );
    if (isType) {
      dispatch(productsPresentationSlices.actions.resetListTypeProduct());
      setListSlected([]);
    } else {
      dispatch(productsPresentationSlices.actions.setAllPriceToNull());
    }
  };

  const handleFind = () => {
    dispatch(
        productsPresentationSlices.actions.setStar({ key: "", star: 0 })
      );
    dispatch(productsPresentationSlices.actions.setPageNumber({pageNumber: 1}));
    dispatch(filterByAll());
  };

  return (
    <div className={s.controlButton}>
      <Button
        color="Accent7"
        sx={{ fontSize: "1.6rem", textTransform: "none" }}
        variant="outlined"
        fullWidth
        onClick={resetList}
      >
        Reset
      </Button>
      <Button
        color="Accent7"
        sx={{ fontSize: "1.6rem", textTransform: "none" }}
        variant="outlined"
        fullWidth
        onClick={handleFind}
      >
        Find
      </Button>
    </div>
  );
}
