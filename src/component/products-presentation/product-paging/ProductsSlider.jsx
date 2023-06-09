import { Pagination } from "@mui/material";
import s from "./productsSlider.module.scss";
import React, { useEffect } from "react";
import { pageSelector, slidePage } from "../productsPresentationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function ProductsSlider({ pageNumber = 10 }) {
   const page = useSelector(pageSelector);
   const [currentPage, setCurrentPage] = useState(1);
   const dispatch = useDispatch();
   console.log(pageNumber, 'pagenumber -------------------------')
   const handleChange = (event, value) => {
      console.log(value);
      dispatch(slidePage(value));
      setCurrentPage(value);
   };

   useEffect(() => {
      console.log(page, '-------------page');
   }, [page]);
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
