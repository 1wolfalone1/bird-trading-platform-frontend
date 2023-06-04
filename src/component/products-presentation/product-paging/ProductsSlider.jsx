import { Pagination } from "@mui/material";
import s from "./productsSlider.module.scss";
import React, { useEffect } from "react";
import { slidePage } from "../productsPresentationSlice";
import { useDispatch } from "react-redux";

export default function ProductsSlider({ pageNumber = 10 }) {
   const [page, setPage] = React.useState(1);

   const dispatch = useDispatch();
   const handleChange = (event, value) => {
      setPage(value);
   };

   useEffect(() => {
      dispatch(slidePage(page));
   }, [page]);
   console.log(page);
   return (
      <div className={s.containerSlider}>
         <Pagination
            count={pageNumber}
            showFirstButton
            showLastButton
            shape="rounded"
            size="large"
            sx={{}}
            variant="outlined"
            color="Dominant0"
            page={page}
            onChange={handleChange}
            
         />
      </div>
   );
}
