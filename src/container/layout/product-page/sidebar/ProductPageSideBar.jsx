import { Button, IconButton } from "@mui/material";
import s from "./productPageSideBar.module.scss";

import React, { useState } from "react";
import Bird from "../../../../asset/icons/Bird";
import Accessories from "./../../../../asset/icons/Accessories";
import Food from "./../../../../asset/icons/Food";
import clsx from "clsx";

const buttonStyle = {
   height: "100%",
   flex: 1,
   borderRadius: "1.6rem"
};
const listButton = [
   { button: Bird, id: 1 },
   { button: Accessories, id: 2 },
   { button: Food, id: 3 },
];
export default function ProductPageSideBar() {
   const [activePage, setActivePage] = useState(1);
   return (
      <div className={s.container}>
         {listButton.map((button) => (
            <div key={button.id} className={clsx(s.buttonContainer, 
               {[s.active]: (button.id === activePage)}
             )}>
               <Button onClick={() => setActivePage(button.id)} color="Accent7">
                  <button.button className={s.icon} />
               </Button>
            </div>
         ))}
      </div>
   );
}
