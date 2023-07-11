import { Button } from "@mui/material";
import s from "./productPageSideBar.module.scss";

import clsx from "clsx";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Bird from "../../../../asset/icons/Bird";
import productsPresentationSlices, {
  filterByAll,
  typeProduct,
} from "../../../../component/products-presentation/productsPresentationSlice";
import Accessories from "./../../../../asset/icons/Accessories";
import Food from "./../../../../asset/icons/Food";

const buttonStyle = {
  height: "100%",
  flex: 1,
  borderRadius: "1.6rem",
};
const listButton = [
  { button: Bird, id: 1, type: typeProduct.BIRDS },
  { button: Accessories, id: 3, type: typeProduct.ACCESSORIES },
  { button: Food, id: 2, type: typeProduct.FOODS },
];
export default function ProductPageSideBar() {
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  const handleSideBarClick = (button) => {
    return (e) => {
      setActivePage(button.id);
      // dispatch(changeTypeProduct(button.type));
      dispatch(productsPresentationSlices.actions.chagePageState(button.type));
      dispatch(
        productsPresentationSlices.actions.setCategory({
          key: "",
          category: button.id,
        })
      );
      dispatch(productsPresentationSlices.actions.resetListTypeProduct());
      dispatch(
        productsPresentationSlices.actions.setPageNumber({
          key: "",
          pageNumber: 1,
        })
      );
      dispatch(filterByAll());
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
