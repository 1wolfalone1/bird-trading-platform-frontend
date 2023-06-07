import { useParams } from "react-router-dom";
import s from "./productDetails.module.scss";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../api/server/API";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ThumpImage from "./thump-image/ThumpImage";
import { Button, Chip, Divider, IconButton, Rating } from "@mui/material";
import BirdProperties from "./properties/BirdProperties";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom/client";
export default function ProductDetails() {
   const param = useParams();
   const [product, setProduct] = useState();
   const dispatch = useDispatch();
   const element = `${product?.product.description}`;
   useEffect(() => {
      const getProducts = async () => {
         try {
            const response = await api.get(`/products/${param.id}`);
            const data = await response.data;
            console.log(data);
            setProduct(data);
         } catch (error) {
            console.log(error);
         }
      };
      getProducts();
      if (product) {
         //    const root = ReactDOM.createRoot(document.getElementById("content"));
         //    root.render();
      }
   }, []);
   // const root = ReactDOM.createRoot(document.getElementById("content"));
   // root.render(element);
   return (
      <>
         {product ? (
            <div className={clsx(s.container)}>
               <div className={s.detail}>
                  <div className={s.summaryProduct}>
                     <div className={s.listImage}>
                        <ThumpImage images={product.listImages} />
                     </div>
                     <div className={s.content}>
                        <div className={s.productName}>
                           <span>{product.product.name}</span>
                        </div>
                        <div className={s.metric}>
                           <span>{product.numberSold} sold</span>
                           <Divider orientation="vertical" color="error" />
                           <span>{product.product.star}</span>
                           <Rating
                              value={product.star}
                              readOnly
                              precision={0.5}
                           />
                           <span>- {product.numberReview} review</span>
                        </div>
                        <div className={s.mainContent}>
                           <div className={s.price}>
                              {product.product.discountRate !== 0 ? (
                                 <>
                                    <span className={s.oldPrice}>
                                       {product.product.price}$
                                    </span>
                                    <span className={s.disPrice}>
                                       {product.product.discountedPrice}$
                                    </span>
                                    <span className={s.discount}>
                                       {(product.product.discountRate * 100).toFixed(0)}%
                                    </span>
                                 </>
                              ) : (
                                 <span className={s.disPrice}>
                                    {product.product.price}$
                                 </span>
                              )}
                           </div>
                           <div className={s.type}>
                              <span>
                                 Type: <span>{product.product.type.name}</span>
                              </span>
                           </div>
                           {product.product.tags.length > 0 && (
                              <div className={s.tag}>
                                 <span>Tag: </span>
                                 {product.product.tags.map((tag) => (
                                    <Chip
                                       key={tag.id}
                                       label={`#${tag.name}`}
                                       sx={{
                                          fontSize: "2rem",
                                          margin: "0.4rem",
                                          color: "#3e3d3d",
                                       }}
                                    />
                                 ))}
                              </div>
                           )}
                           <div className={s.commonProperties}>
                              <span className={s.commonProperties}>
                                 Common properties:
                              </span>
                              <BirdProperties product={product.product} />
                           </div>
                        </div>
                        <div className={s.quantity}>
                           <span className={s.titleQuantity}>Quantity: </span>
                           <div>
                              <IconButton color="Accent7">
                                 <RemoveCircleIcon sx={{ fontSize: "3rem" }} />
                              </IconButton>
                              <input value={1} min={1} />
                              <IconButton color="Accent7">
                                 <AddCircleIcon sx={{ fontSize: "3rem" }} />
                              </IconButton>
                           </div>
                           <span className={s.stock}>
                              {product.product.quantity} in stocks
                           </span>
                        </div>
                        <div className={s.footer}>
                           <div className={s.shop}>
                              <div className={s.image}>
                                 <img
                                    src={product.product.shopOwner.imgUrl}
                                    alt=""
                                 />
                              </div>
                              <div className={s.name}>
                                 <span>
                                    {product.product.shopOwner.shopName}
                                 </span>
                              </div>
                           </div>

                           <div className={s.buttonControl}>
                              <Button
                                 sx={{ fontSize: "2.4rem" }}
                                 color="Accent7"
                                 variant="outlined"
                              >
                                 Add to cart{" "}
                                 <ShoppingCartCheckoutIcon
                                    sx={{
                                       fontSize: "2.4rem",
                                       marginLeft: "1rem",
                                    }}
                                 />
                              </Button>
                              <Button
                                 sx={{ fontSize: "2.4rem", marginLeft: "1rem" }}
                                 variant="contained"
                                 color="error"
                              >
                                 {" "}
                                 Order now
                              </Button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <Divider />
                  <div className={s.description}>
                     <h1>Description</h1>
                     <div dangerouslySetInnerHTML={{ __html: element }} className={s.content}/>
                  </div>
               </div>

               <div className={s.review}></div>
            </div>
         ) : (
            "loaddding"
         )}
      </>
   );
}
