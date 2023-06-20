import { useNavigate, useParams } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom/client";
import cartSlice, {
   getCartStatusSelector,
   getItemQuantity,
} from "../order/cartSlice";
import AddToCartToast, {
   toastType,
} from "../../component/toast/content/AddToCartToast";
import { toast } from "react-toastify";
import Style from "../../style/inline-style/style";
import globalConfigSlice from "../../redux/global/globalConfigSlice";
import { SmsIcon } from '@mui/icons-material/Sms';
const quantityControlStatus = {
   DECREASE: -1,
   CHANGE: 0,
   INCREASE: 1,
};
function mapObjects(source, target) {
   for (let property in source) {
      if (target.hasOwnProperty(property)) {
         target[property] = source[property];
      }
   }
   return target;
}
export default function ProductDetails() {
   const navigate = useNavigate();
   const param = useParams();
   const cartStatus = useSelector(getCartStatusSelector);
   const [product, setProduct] = useState();
   const dispatch = useDispatch();
   const cartQuantity = useSelector(getItemQuantity(product?.product?.id));
   const element = `${product?.product.description}`;
   const [quantity, setQuantity] = useState(1);
   const [firstCall, setFirstCall] = useState(true);
   const handleButton = {
      fontSize: "2.4rem",
      fontFamily: Style.font.$Primary,
      textTransform: "none",
      padding: "1rem 2rem",
      marginLeft: "2rem",
   };

   const notifyWarningAddtoCart = (message) =>
      toast(<AddToCartToast type={toastType.WARNING} msg={message} />, {
         position: toast.POSITION.TOP_RIGHT,
         autoClose: 1500,
      });
   console.log(product);
   useEffect(() => {
      console.log(firstCall);
      if (!firstCall) {
         if (!cartStatus.isValid) {
            notifyWarningAddtoCart(cartStatus.msg);
         } else {
            toast(<AddToCartToast type={toastType.SUCCESS} />, {
               position: toast.POSITION.TOP_RIGHT,
               autoClose: 1500,
            });
         }
      }
      setFirstCall(false);
   }, [cartStatus]);
   const handleQuantityChange = (status) => {
      return (e) => {
         let currentQuantity = cartQuantity;
         if (!cartQuantity) {
            currentQuantity = 0;
         }
         if (status === quantityControlStatus.DECREASE) {
            if (quantity > 0) {
               setQuantity((state) => +state - 1);
            }
         }
         if (status === quantityControlStatus.CHANGE) {
            if (
               +currentQuantity + +e.target.value <= product.product.quantity &&
               +currentQuantity + +e.target.value >= 0
            ) {
               setQuantity(+e.target.value);
            } else {
               notifyWarningAddtoCart();
            }
         }
         if (status === quantityControlStatus.INCREASE) {
            if (quantity + currentQuantity < product.product.quantity) {
               setQuantity((state) => +state + 1);
            } else {
               notifyWarningAddtoCart();
            }
         }
      };
   };
   const handleAddToCart = () => {
      let currentCartQuantity = cartQuantity;
      if (!cartQuantity) {
         currentCartQuantity = 0;
      }
      const cartObject = mapObjects(product.product, {
         cartQuantity: +quantity + +currentCartQuantity,
         id: 0,
         name: "",
         imgUrl: "",
         price: 0,
         discountedPrice: 0,
         discountRate: 0,
         quantity: 0,
         categoryId: 0,
         shopOwner: {
            id: 3,
            shopName: "Bookstore",
            imgUrl: null,
         },
      });
      dispatch(
         cartSlice.actions.changeQuantity({
            cartObject: cartObject,
            isDetails: true,
            quantityAdded: +quantity,
         })
      );
   };

   const handleOrderNow = () => {
      let currentCartQuantity = cartQuantity;
      if (!cartQuantity) {
         currentCartQuantity = 0;
      }
      const cartObject = mapObjects(product.product, {
         cartQuantity: +quantity + +currentCartQuantity,
         id: 0,
         name: "",
         imgUrl: "",
         price: 0,
         discountedPrice: 0,
         discountRate: 0,
         quantity: 0,
         categoryId: 0,
         shopOwner: {
            id: 3,
            shopName: "Bookstore",
            imgUrl: null,
         },
      });
      dispatch(
         cartSlice.actions.changeQuantity({
            cartObject: cartObject,
            isDetails: true,
            quantityAdded: +quantity,
         })
      );
      navigate("/cart");
   };
   useEffect(() => {
      const getProducts = async () => {
         try {
            dispatch(globalConfigSlice.actions.changeBackDrops(true));
            const response = await api.get(`/products/${param.id}`);
            const data = await response.data;
            console.log(data);
            setProduct(data);
            dispatch(globalConfigSlice.actions.changeBackDrops(false));
         } catch (error) {
            dispatch(globalConfigSlice.actions.changeBackDrops(false));
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
                        <ThumpImage
                           images={product.listImages}
                           video={product.product.videoUrl}
                        />
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
                              value={product.product.star}
                              readOnly
                              precision={0.5}
                           />
                           <span>- {product.numberReview} review</span>
                        </div>
                        <div className={s.mainContent}>
                           <div className={s.price}>
                              <div className={s.countPrice}>
                                 {product.product.discountRate !== 0 ? (
                                    <>
                                       <span className={s.oldPrice}>
                                          {Number(
                                             product.product.price
                                          ).toFixed(2)}
                                          $
                                       </span>
                                       <span className={s.disPrice}>
                                          {Number(
                                             product.product.discountedPrice
                                          ).toFixed(2)}
                                          $
                                       </span>
                                       <span className={s.discount}>
                                          {(
                                             product.product.discountRate * 100
                                          ).toFixed(0)}
                                          %
                                       </span>
                                    </>
                                 ) : (
                                    <span className={s.disPrice}>
                                       {Number(product.product.price).toFixed(
                                          2
                                       )}
                                       $
                                    </span>
                                 )}
                              </div>
                              <div className={s.shop}>
                                 <div className={s.image}>
                                    <img
                                       src={product.product.shopOwner.imgUrl}
                                       alt=""
                                    />
                                 </div>
                                 <div className={s.right}>
                                    <IconButton>
                                       <SmsIcon
                                          sx={{ fontSize: "5rem" }}
                                          color={"Accent7"}
                                       />
                                    </IconButton>
                                 </div>
                              </div>
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
                              <IconButton
                                 color="Accent7"
                                 onClick={handleQuantityChange(
                                    quantityControlStatus.DECREASE
                                 )}
                              >
                                 <RemoveCircleIcon sx={{ fontSize: "3rem" }} />
                              </IconButton>
                              <input
                                 value={quantity}
                                 min={1}
                                 max={product.product.quantity}
                                 onChange={handleQuantityChange(
                                    quantityControlStatus.CHANGE
                                 )}
                              />
                              <IconButton
                                 color="Accent7"
                                 onClick={handleQuantityChange(
                                    quantityControlStatus.INCREASE
                                 )}
                              >
                                 <AddCircleIcon sx={{ fontSize: "3rem" }} />
                              </IconButton>
                           </div>
                           <span className={s.stock}>
                              {product.product.quantity} in stocks
                           </span>
                        </div>
                        <div className={s.footer}>
                           <div className={s.buttonControl}>
                              <Button
                                 sx={handleButton}
                                 color="Accent7"
                                 variant="outlined"
                                 onClick={handleAddToCart}
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
                                 sx={handleButton}
                                 variant="contained"
                                 color="error"
                                 onClick={handleOrderNow}
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
                     <div
                        dangerouslySetInnerHTML={{ __html: element }}
                        className={s.content}
                     />
                  </div>
               </div>

               <div className={s.review}></div>
            </div>
         ) : (
            <></>
         )}
      </>
   );
}
