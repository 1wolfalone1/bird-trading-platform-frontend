import { useNavigate, useParams } from "react-router-dom";
import s from "./productDetails.module.scss";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Button, Chip, Divider, IconButton, Rating } from "@mui/material";
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
import globalConfigSlice from "../../redux/global/globalConfigSlice";
import Style from "../../style/inline-style/style";
import cartSlice, {
  getCartStatusSelector,
  getItemQuantity,
} from "../order/cartSlice";

import ButtonChatNow from "../../component/message/button-chatnow/ButtonChatNow";
import { userInfoSelector } from "../../redux/global/userInfoSlice";
import { formatNumber } from "../../utils/myUtils";

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

const cssButton = {
  border: "1px solid #000000",
  padding: "0.5rem 1.5rem",
  fontSize: "2rem",
  textTransform: "none",
  fontFamily: "SeoulHangang",
  color: "rgb(255, 255, 255)",
  backgroundColor: "rgb(94, 94, 94)",
  "&:hover": { color: "rgb(4, 0, 30)" },
};

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
  const { status } = useSelector(userInfoSelector);

  const buttonOrder = {
    fontSize: "2.4rem",
    fontFamily: Style.font.$Secondary,
    border: "1px solid rgba(0, 0, 0, 0.5)",
    textTransform: "none",
    padding: "1rem 2rem",
    marginLeft: "2rem",
    backgroundColor: "rgb(178, 223, 255)",
    fontWeight: "800",
    color: "black",
    "&:hover": {
      border: "1px solid rgba(0, 0, 0, 0.5)",
      color: "rgb(178, 223, 255)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const buttonAdd = {
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
  }, [param]);

  const handleViewShop = () => {
    navigate(`/shop/${product.product.shopOwner.id}`);
  };
  // const root = ReactDOM.createRoot(document.getElementById("content"));
  // root.render(element);
  const cssButton = {
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
                  <Divider orientation="vertical" color="error" />
                  <span> {product.numberReview} review</span>
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
                          <span className={s.discount}>
                            {(product.product.discountRate * 100).toFixed(0)}%
                            off
                          </span>
                        </>
                      ) : (
                        <span className={s.disPrice}>
                          {formatNumber(product.product.price)}
                        </span>
                      )}
                    </div>
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
                              css={cssButton}
                              text={"Chat now"}
                            />
                          </div>
                          <div className={clsx(s.viewShop)}>
                            <Button
                              sx={cssButton}
                              onClick={handleViewShop}
                              shop={product.product.shopOwner}
                            >
                              View shop
                            </Button>
                          </div>
                        </div>
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
                      sx={buttonAdd}
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
                      sx={buttonOrder}
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
              <h3>Description</h3>
              <div
                dangerouslySetInnerHTML={{ __html: element }}
                className={s.content}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
