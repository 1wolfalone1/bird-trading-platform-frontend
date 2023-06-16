import { Pagination } from "@mui/material";
import s from "./productsSlider.module.scss";
import React, { useEffect } from "react";
import productsPresentationSlices, {
  filterByAll,
  filterObjectSelector,
  pageSelector,
} from "../productsPresentationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function ProductsSlider({ pageNumber = 10 }) {
  const page = useSelector(pageSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const filterObj = useSelector(filterObjectSelector);
  const handleChange = (event, value) => {
    dispatch(
      productsPresentationSlices.actions.setPageNumber({
        key: "",
        pageNumber: value,
      })
    );
    setCurrentPage(value);
    dispatch(filterByAll());
  };

  useEffect(() => {
    setCurrentPage(filterObj.pageNumber);
  }, [page, filterObj.pageNumber]);
  return (
    <div className={s.containerSlider}>
      <Pagination
        count={page}
        showFirstButton
        showLastButton
        shape="rounded"
        size="large"
        sx={{}}
        variant="outlined"
        color="Dominant0"
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
}
