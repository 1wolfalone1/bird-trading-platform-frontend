import { Rating, Tooltip } from "@mui/material";
import s from "./productHomeCard.module.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../utils/myUtils";

export default function ProductHomeCard({ product, isSuggest }) {
  const [value, setValue] = useState(2);
  const navigate = useNavigate();

  return (
    <div
      className={s.container}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className={s.img}>
        <img src={product.imgUrl} alt="" />
        <div className={s.floatContent}>
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
        </div>
      </div>
      <div className={s.info}>
        <div className={s.name} title={product.name}>
          <span>{product.name}</span>
        </div>

        <div className={s.shop}>
          <div className={s.shopAvatar}>
            <img src={product.shopOwner.imgUrl} alt="" />
          </div>
          <dir className={s.shopName}>
            <span>{product.shopOwner.shopName}</span>
          </dir>
        </div>
        {isSuggest && (
          <>
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
                        <span style={{ fontSize: "1.3rem" }} key={tag.id}>
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
                      <span className={s.tag} key={tag.id}>
                        {" "}
                        #{tag.name}
                      </span>
                    ))
                  : ""}
              </div>
            </Tooltip>
          </>
        )}
        <div className={s.star}>
          <Rating
            name="simple-controlled"
            value={product.star}
            precision={0.5}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            size="medium"
            readOnly={true}
            color="Dominant1"
          />
        </div>
      </div>
    </div>
  );
}
