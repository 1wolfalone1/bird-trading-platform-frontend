import { Rating } from "@mui/material";
import clsx from "clsx";
import React from "react";
import s from "./rate.module.scss";

const ratings = [
  {
    id: 1,
    userName: "Buck",
    avatar:
      "https://pagesunbound.files.wordpress.com/2012/03/call-of-the-wild.jpg",
    timeOfRating: 1687693663211,
    star: 2,
    review: "Good product, ship fast and shipper friendly",
  },
  {
    id: 2,
    userName: "John",
    avatar:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    timeOfRating: 1687693683222,
    star: 4,
    review: "Excellent service and high-quality products",
  },
  {
    id: 3,
    userName: "Alice",
    avatar:
      "https://st3.depositphotos.com/1064024/14272/i/450/depositphotos_142722813-stock-photo-heart-love-tree.jpg",
    timeOfRating: 1687693993233,
    star: 5,
    review: "Impressed with the quick delivery and great customer support",
  },
  // Add more rating objects as needed
  {
    id: 4,
    userName: "Jane",
    avatar:
      "https://i.pinimg.com/222x/a9/67/91/a96791a3c302f73450f8db4c39bb0a5b.jpg",
    timeOfRating: 1687694663244,
    star: 3.5,
    review: "Decent product, but could use improvement in packaging",
  },
  {
    id: 5,
    userName: "Mike",
    avatar:
      "https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg",
    timeOfRating: 1687695663255,
    star: 1,
    review: "Disappointed with the product quality and slow shipping",
  },
];

export default function Rate() {
  return (
    <>
      <div className={clsx(s.container)}>
        <div className={clsx(s.cover)}>
          <div className={clsx(s.title)}>
            <h3>Product Rating</h3>
          </div>
          {ratings.map((rating) => (
            <div className={clsx(s.detail)}>
              <div className={clsx(s.customer)}>
                <div className={clsx(s.image)}>
                  <img src={rating?.avatar} alt="" />
                </div>
                <div className={clsx(s.right)}>
                  <div className={clsx(s.userName)}>
                    <span>{rating?.userName}</span>
                  </div>
                  <div className={clsx(s.star)}>
                    <Rating value={rating.star} readOnly precision={0.5} />
                  </div>
                </div>
              </div>
              <div className={clsx(s.timeOfRating)}>
                {new Date(rating?.timeOfRating).toLocaleString("en-GB")}
              </div>
              <div className={clsx(s.content)}>{rating?.review}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
