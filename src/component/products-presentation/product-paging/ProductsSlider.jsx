import { Pagination, makeStyles } from "@mui/material";
import s from "./productsSlider.module.scss";
import React from "react";

export default function ProductsSlider({ pageNumber = 10 }) {
   const [page, setPage] = React.useState(1);
   const handleChange = (event, value) => {
      setPage(value);
   };
   console.log(page);
   return (
      <div className={s.container}>
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
