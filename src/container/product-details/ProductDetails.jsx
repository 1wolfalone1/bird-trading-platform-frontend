import { useNavigate, useParams } from "react-router-dom";
import s from "./productDetails.module.scss";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Rating,
  Skeleton,
  Stack,
} from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { api } from "../../api/server/API";
import BirdProperties from "./properties/BirdProperties";
import ThumpImage from "./thump-image/ThumpImage";

import { toast } from "react-toastify";
import AddToCartToast, {
  toastType,
} from "../../component/toast/content/AddToCartToast";
import globalConfigSlice, {
  backDropSelector,
} from "../../redux/global/globalConfigSlice";
import Style from "../../style/inline-style/style";
import cartSlice, {
  getCartStatusSelector,
  getItemQuantity,
} from "../order/cartSlice";

import ButtonChatNow from "../../component/message/button-chatnow/ButtonChatNow";
import { userInfoSelector } from "../../redux/global/userInfoSlice";
import { formatNumber } from "../../utils/myUtils";
import FoodProperties from "./properties/FoodProperties";
import AccessoryProperties from "./properties/AccessoryProperties";

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

const cssButton1 = {
  border: "1px solid rgba(0, 0, 0, 0.5)",
  padding: "1rem 2rem",
  fontSize: "2.2rem",
  textTransform: "none",
  color: "rgb(255, 255, 255)",
  backgroundColor: "rgb(94, 94, 94)",
  "&:hover": {
    color: "rgb(4, 0, 30)",
    border: "1px solid rgba(0, 0, 0, 0.5)",
  },
};

const cssButton2 = {
  fontSize: "2.4rem",
  fontFamily: Style.font.$Secondary,
  border: "1px solid rgba(0, 0, 0, 0.5)",
  textTransform: "none",
  padding: "1rem 2rem",
  marginLeft: "2rem",
  backgroundColor: "rgb(178, 223, 255)",
  color: "black",
  fontWeight: "800",
  "&:hover": {
    border: "1px solid rgba(0, 0, 0, 0.5)",
    color: "rgb(178, 223, 255)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

export default function ProductDetails({ setIsFound }) {
  const navigate = useNavigate();
  const param = useParams();
  const cartStatus = useSelector(getCartStatusSelector);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const backDrop = useSelector(backDropSelector);
  const dispatch = useDispatch();
  const cartQuantity = useSelector(getItemQuantity(product?.product?.id));
  const element = `${product?.product.description}`;
  const [quantity, setQuantity] = useState(1);
  const [firstCall, setFirstCall] = useState(true);
  const { status } = useSelector(userInfoSelector);
  const [ban, setBan] = useState(false);

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
        setBan(false);
      } catch (error) {
        dispatch(globalConfigSlice.actions.changeBackDrops(false));
        console.log(error);
        const res = await error.response;
        if (res.status === 423) {
          setBan(true);
          setProduct(res.data);
        } else {
          setIsFound(false);
        }
      }
    };
    getProducts();
    if (product) {
      //    const root = ReactDOM.createRoot(document.getElementById("content"));
      //    root.render();
    }
  }, [param]);

  const handleViewShop = () => {
    navigate(`/shop/${product.product.shopOwner.id}`);
  };
  // const root = ReactDOM.createRoot(document.getElementById("content"));
  // root.render(element);

  useEffect(() => {
    setTimeout(() => {
      setLoading(!backDrop);
    }, 100);
  }, [backDrop]);

  return (
    <>
      {product ? (
        <>
          {!loading ? (
            <Stack
              spacing={2}
              sx={{ alignItems: "center" }}
              className={s.container}
            >
              <Box
                width={1275}
                height={600}
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.11)",
                }}
                className={s.skeletonContainer}
              >
                <div className={clsx(s.left)}>
                  <Skeleton variant="rectangular" width={520} height={520} />
                  <div className={clsx(s.imageIntro)}>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Skeleton variant="rectangular" width={100} height={72} />
                    ))}
                  </div>
                </div>
                <div className={clsx(s.right)}>
                  <div className={clsx(s.header)}>
                    <Skeleton variant="rectangular" width={670} height={100} />
                  </div>
                  <div className={clsx(s.priceAndShop)}>
                    <div className={clsx(s.price)}>
                      <Skeleton variant="rectangular" width={270} height={86} />
                    </div>
                    <div className={clsx(s.shop)}>
                      <div className={clsx(s.avatar)}>
                        <Skeleton variant="circular" width={80} height={80} />
                      </div>
                      <div className={clsx(s.title)}>
                        <Skeleton
                          variant="rectangular"
                          width={248}
                          height={30}
                        />
                        <div className={clsx(s.button)}>
                          {Array.from({ length: 2 }).map((_, index) => (
                            <Skeleton
                              variant="rectangular"
                              width={120}
                              height={48}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={clsx(s.text)}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton variant="rectangular" width={270} height={36} />
                    ))}
                  </div>
                  <div className={clsx(s.button)}>
                    {Array.from({ length: 2 }).map((_, index) => (
                      <Skeleton variant="rectangular" width={127} height={48} />
                    ))}
                  </div>
                </div>
              </Box>
            </Stack>
          ) : (
            <div className={clsx(s.container)}>
              <div className={s.detail}>
                <div className={s.summaryProduct}>
                  <div className={s.listImage}>
                    <ThumpImage
                      images={product.listImages}
                      video={product.product.videoUrl}
                    />
                    {ban && (
                      <img
                        src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/banned.png"
                        alt="This product banned"
                        className={clsx(s.additionalImage)}
                      />
                    )}
                  </div>
                  <div className={s.content}>
                    <div className={s.productName}>
                      <span>{product.product.name}</span>
                    </div>
                    <div className={s.metric}>
                      <span>
                        {product.numberSold.toLocaleString({
                          minimumFractionDigits: 0,
                        })}{" "}
                        sold
                      </span>
                      <Divider orientation="vertical" color="error" />
                      <span>{product.product.star}</span>
                      <Rating
                        value={product.product.star}
                        readOnly
                        precision={0.5}
                      />
                      <Divider orientation="vertical" color="error" />
                      <span>
                        {" "}
                        {product.numberReview.toLocaleString({
                          minimumFractionDigits: 0,
                        })}{" "}
                        reviews
                      </span>
                    </div>
                    <div className={s.mainContent}>
                      <div className={s.price}>
                        <div className={s.countPrice}>
                          {product.product.discountRate !== 0 ? (
                            <>
                              <span className={s.disPrice}>
                                {formatNumber(product.product.discountedPrice)}
                              </span>
                              <span className={s.oldPrice}>
                                {formatNumber(product.product.price)}
                              </span>
                              <Chip
                                label={`${(
                                  product.product.discountRate * 100
                                ).toFixed(0)}% off`}
                                sx={{
                                  fontSize: "3rem",
                                  color: "rgb(96, 25, 131)",
                                }}
                              />
                            </>
                          ) : (
                            <span className={s.disPrice}>
                              {formatNumber(product.product.price)}
                            </span>
                          )}
                        </div>
                        {!ban && (
                          <div className={s.shop}>
                            <div className={s.image}>
                              <img
                                src={product.product.shopOwner.imgUrl}
                                alt="shop img"
                                onClick={handleViewShop}
                              />
                            </div>
                            <div className={s.right}>
                              <div className={s.name}>
                                {product.product.shopOwner.shopName}
                              </div>
                              <div className={clsx(s.action)}>
                                <div className={clsx(s.chat)}>
                                  <ButtonChatNow
                                    ButtonOrIcon={Button}
                                    shop={product.product.shopOwner}
                                    css={cssButton1}
                                    text={"Chat Now"}
                                  />
                                </div>
                                <div className={clsx(s.viewShop)}>
                                  <Button
                                    sx={cssButton1}
                                    onClick={handleViewShop}
                                    shop={product.product.shopOwner}
                                  >
                                    View Shop
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
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
                        {product.product.categoryId === 1 && (
                          <BirdProperties product={product.product} />
                        )}
                        {product.product.categoryId === 2 && (
                          <FoodProperties product={product.product} />
                        )}
                        {product.product.categoryId === 3 && (
                          <AccessoryProperties product={product.product} />
                        )}
                      </div>
                    </div>
                    {!ban && (
                      <>
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
                              value={quantity.toLocaleString({
                                minimumFractionDigits: 0,
                              })}
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
                            {product.product.quantity.toLocaleString({
                              minimumFractionDigits: 0,
                            })}{" "}
                            in stocks
                          </span>
                        </div>
                        <div className={s.footer}>
                          <Button
                            sx={cssButton2}
                            color="Accent7"
                            variant="outlined"
                            onClick={handleAddToCart}
                          >
                            Add To Cart{" "}
                            <ShoppingCartCheckoutIcon
                              sx={{
                                fontSize: "2.4rem",
                                marginLeft: "1rem",
                              }}
                            />
                          </Button>
                          <Button
                            sx={cssButton2}
                            variant="contained"
                            color="error"
                            onClick={handleOrderNow}
                          >
                            {" "}
                            Order Now
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <Divider />
                <div className={s.description}>
                  <h3>Description</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: element }}
                    className={s.content}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
