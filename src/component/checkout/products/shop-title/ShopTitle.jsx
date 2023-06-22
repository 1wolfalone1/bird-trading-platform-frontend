import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import s from "./shopTitle.module.scss";
import React from "react";
import { Box, Typography } from "@mui/material";
import Style from "../../../../style/inline-style/style";

export default function ShopTitle({ shop }) {
   console.log(shop);
   return (
      <Grid2 container p={"0.4rem 3rem"}>
         <Grid2 xs={5} sx={{ display: "flex", gap: "1rem", alignItems: 'flex-end' }}>
            <Box sx={{ height: "4rem", width: "4rem" }}>
               <img
                  style={{
                     width: "100%",
                     height: "100%",
                     borderRadius: "100%",
                  }}
                  src={shop.imgUrl}
                  alt=""
               />
            </Box>
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <Typography
                  variant="h4"
                  sx={{ fontSize: "3rem", fontFamily: Style.font.$Secondary }}
               >
                  {shop.shopName}
               </Typography>
            </Box>
         </Grid2>
         <Grid2 xs={7} sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Typography sx={{ fontSize: "1.6rem" , textAlign: 'end'}}>
               {shop.address.address}
            </Typography>
         </Grid2>
      </Grid2>
   );
}
