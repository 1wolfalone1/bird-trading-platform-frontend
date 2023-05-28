import { Button } from "@mui/material";
import React from "react";
import s from './sideBarFIlter.module.scss'
export default function ButtonControl() {
   return (
      <div className={s.controlButton}>
         <Button
            color="Accent7"
            sx={{ fontSize: "1.6rem" }}
            variant="outlined"
            fullWidth
         >
            Reset
         </Button>
         <Button
            color="Accent7"
            sx={{ fontSize: "1.6rem" }}
            variant="outlined"
            fullWidth
         >
            Find
         </Button>
      </div>
   );
}
