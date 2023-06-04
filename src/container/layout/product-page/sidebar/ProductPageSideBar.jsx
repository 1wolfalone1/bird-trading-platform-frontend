import { Button, IconButton } from "@mui/material";
import s from "./productPageSideBar.module.scss";

import React, { useState } from "react";
import Bird from "../../../../asset/icons/Bird";
import Accessories from "./../../../../asset/icons/Accessories";
import Food from "./../../../../asset/icons/Food";
import clsx from "clsx";
import {
   changeTypeProduct,
   typeProduct,
} from "../../../../component/products-presentation/productsPresentationSlice";
import { useDispatch } from "react-redux";

const buttonStyle = {
   height: "100%",
   flex: 1,
   borderRadius: "1.6rem",
};
const listButton = [
   { button: Bird, id: 1, type: typeProduct.BIRDS },
   { button: Accessories, id: 2, type: typeProduct.ACCESSORIES },
   { button: Food, id: 3, type: typeProduct.FOODS },
];
export default function ProductPageSideBar() {
   const [activePage, setActivePage] = useState(1);
   const dispatch = useDispatch();
   const handleSideBarClick = (button) => {
      return (e) => {
         console.log(button, "111111111111111111111111");
         setActivePage(button.id);
         dispatch(changeTypeProduct(button.type));
      };
   };
   return (
      <div className={s.container}>
         {listButton.map((button) => (
            <div
               key={button.id}
               className={clsx(s.buttonContainer, {
                  [s.active]: button.id === activePage,
               })}
            >
               <Button onClick={handleSideBarClick(button)} color="Accent7">
                  <button.button className={s.icon} />
               </Button>
            </div>
         ))}
      </div>
   );
}
