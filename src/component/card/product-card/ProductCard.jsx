import clsx from "clsx";
import s from "./productCard.module.scss";
import React, { useId } from "react";
import { Grid } from "swiper";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IconButton, Rating, Tooltip } from "@mui/material";
import CartDown from "../../../asset/icons/CartDown";
import Details from "../../../asset/icons/Details";
import Style from "../../../style/inline-style/style";
import { useDispatch } from "react-redux";
import cartSlice from "../../../container/order/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import AddToCartToast from "../../toast/content/AddToCartToast";
import globalConfigSlice from "../../../redux/global/globalConfigSlice";
import { changeTypeProduct } from './../../products-presentation/productsPresentationSlice';
import { useNavigate } from "react-router-dom";
const ratingCustomizer = {
   fontSize: "3.2rem",
   color: Style.color.$Dominant7,
};

export default function ProductCard({ product }) {
   const uuid = useId();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleAddToCart = () => {
      dispatch(cartSlice.actions.addToCart({ ...product, cartQuantity: 1 }));
      dispatch(globalConfigSlice.actions.changeToastStyle("add-to-cart"));
      notifyAddtoCart();
   };
   const notifyAddtoCart = () =>
      toast(<AddToCartToast />, {
         position: toast.POSITION.TOP_RIGHT,
         autoClose: 1500,
      });
   return (
      <>
         <div className={s.container}>
            <div className={s.image}>
               <img src={product.imgUrl} alt="" className={s.imageProduct} />
               <div className={s.price}>
                  <span>
                     {product.discountedPrice}$
                     {product.discountRate ? (
                        <>({product.discountRate}% off)</>
                     ) : (
                        ""
                     )}
                  </span>
               </div>
               <div className={s.quantity}>
                  <span>{product.quantity} in stock</span>
               </div>
            </div>
            <div className={s.content}>
               <dir className={s.name}>
                  <span>{product.name}</span>
               </dir>
               <div className={s.shop}>
                  <div className={s.image}>
                     <img src={product.shopOwner.imgUrl} alt="" />
                  </div>
                  <div className={s.name}>
                     <span>{product.shopOwner.shopName}</span>
                  </div>
               </div>
               <div className={s.categories}>
                  <div className={s.type}>
                     <span>
                        <span style={{ color: "#005250" }}>Type:</span>{" "}
                        {product.type.name}
                     </span>
                  </div>
                  <Tooltip
                     title={
                        <>
                           {product.tags
                              ? product.tags.map((tag, i) => (
                                   <span
                                      style={{ fontSize: "1.3rem" }}
                                      key={`${tag.name}${
                                         product.id
                                      }${uuid}${new Date().getTime()}`}
                                   >
                                      {" "}
                                      #{tag.name}
                                   </span>
                                ))
                              : ""}
                        </>
                     }
                     sx={{ fontSize: "8rem" }}
                  >
                     <div className={s.listTag}>
                        {product.tags
                           ? product.tags.map((tag, i) => (
                                <span
                                   className={s.tag}
                                   key={`${tag.name}${
                                      product.id
                                   }${uuid}${new Date().getTime()}`}
                                >
                                   {" "}
                                   #{tag.name}
                                </span>
                             ))
                           : ""}
                     </div>
                  </Tooltip>
               </div>
               <div className={s.controlBottom}>
                  <div className={s.rating}>
                     <Rating
                        value={product.star + 1}
                        sx={ratingCustomizer}
                        readOnly
                     />
                  </div>
                  <div className={s.buttonIcon}>
                     <IconButton onClick={handleAddToCart}>
                        <CartDown />
                     </IconButton>
                     <IconButton onClick={
                        () => {navigate(`/product/${product.id}`)}
                     }>
                        <Details />
                     </IconButton>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
