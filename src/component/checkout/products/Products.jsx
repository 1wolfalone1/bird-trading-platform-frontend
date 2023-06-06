import React from "react";
import clsx from "clsx";
import s from "../products/Products.module.scss";
import Product from "./item/Item";

export default function Products({ products }) {
  return (
    <div>
      <div className={clsx(s.products)}>
        <div className={clsx(s.title)}>Pack: Delivery at Monday 24/5</div>
        {products &&
          products.map((item) => (
            <Product
              key={item.id}
              id={item.id}
              name={item.name}
              shopName={item.shopName}
              image={item.image}
              shopAvt={item.shopAvt}
              price={item.price}
              sale={item.sale}
            ></Product>
          ))}
      </div>
    </div>
  );
}
