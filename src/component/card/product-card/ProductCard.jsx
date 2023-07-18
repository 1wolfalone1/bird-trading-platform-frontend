import { IconButton, Rating, Tooltip } from "@mui/material";
import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartDown from "../../../asset/icons/CartDown";
import Details from "../../../asset/icons/Details";
import cartSlice, {
  getCartStatusSelector,
} from "../../../container/order/cartSlice";
import globalConfigSlice from "../../../redux/global/globalConfigSlice";
import Style from "../../../style/inline-style/style";
import { formatNumber } from "../../../utils/myUtils";
import s from "./productCard.module.scss";
const ratingCustomizer = {
  fontSize: "3.2rem",
  color: Style.color.$Dominant7,
};

export default function ProductCard({ product }) {
  const uuid = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [outOfStock, setOutOfStock] = useState(false);
  const statusQuantity = useSelector(getCartStatusSelector);

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    dispatch(globalConfigSlice.actions.changeToastStyle("add-to-cart"));
    dispatch(cartSlice.actions.addToCart({ ...product, cartQuantity: +1 }));
  };
  useEffect(() => {}, [statusQuantity]);

  const handleNavigate = () => {
    if (product?.quantity > 0) {
      navigate(`/product/${product.id}`);
    }
  };

  useEffect(() => {
    if (product.quantity === 0) {
      setOutOfStock(true);
    }
  }, []);

  return (
    <>
      <div
        className={outOfStock ? s.containerError : s.container}
        onClick={() => {
          handleNavigate();
        }}
      >
        <div className={s.image}>
          <img src={product.imgUrl} alt="" className={s.imageProduct} />
          {outOfStock && (
            <img
              src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/soldout.png"
              alt=""
              className={s.outOfStockImage}
            />
          )}
          <div className={s.price}>
            <span>
              {product.discountRate !== 0 ? (
                <>
                  <span className={s.disPrice}>
                    {formatNumber(product.discountedPrice)}
                  </span>
                  <span className={s.oldPrice}>
                    {formatNumber(product.price)}
                  </span>
                </>
              ) : (
                <span className={s.disPrice}>
                  {formatNumber(product.price)}
                </span>
              )}
            </span>
          </div>
          {product.discountRate !== 0 ? (
            <div className={s.saleOff}>
              <span>{(product.discountRate * 100).toFixed(0)}% off</span>
            </div>
          ) : (
            <></>
          )}
          <div className={s.quantity}>
            <span>{product.quantity} in stock</span>
          </div>
        </div>
        <div className={s.content}>
          <div className={s.name}>
            <span>{product.name}</span>
          </div>
          <div className={s.shop}>
            <div className={s.image}>
              <div className={s.image}>
                <div className={s.image}>
                  <img src={product.shopOwner.imgUrl} alt="" />
                </div>
              </div>
            </div>
            <div className={s.shopName}>
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
              <Rating value={product.star} sx={ratingCustomizer} readOnly />
            </div>
            {!outOfStock && (
              <div className={s.buttonIcon}>
                <IconButton onClick={handleAddToCart}>
                  <CartDown />
                </IconButton>
                <IconButton
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <Details />
                </IconButton>
              </div>
            )}
            {outOfStock && (
              <div className={s.buttonIconError}>
                <IconButton disabled>
                  <CartDown />
                </IconButton>
                <IconButton disabled>
                  <Details />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
