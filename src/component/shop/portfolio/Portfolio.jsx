import React from "react";
import s from "./portfolio.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/server/API";
import { useEffect } from "react";

export default function Portfolio() {
  const portfolio = {
    name: "Pet shop",
    description:
      "Step into a world of magic and wonder at our extraordinary shop located in the heart of the bustling city. The Enchanted Emporium is a haven for all those seeking whimsical delights, one-of-a-kind treasures, and a touch of enchantment in their lives. As you enter our doors, you'll be greeted by an ethereal ambiance that transports you to a realm where dreams come true. The soft glow of crystal chandeliers and the faint scent of exotic herbs fill the air, creating an immersive experience like no other.",
    moreInfo:
      "As you enter our doors, you'll be greeted by an ethereal ambiance that transports you to a realm where dreams come true. The soft glow of crystal chandeliers and the faint scent of exotic herbs fill the air, creating an immersive experience like no other.",
    bonusInfo:
      "Explore our carefully curated collection of enchanted artifacts, mystical talismans, and spellbinding curiosities. From shimmering potions that promise to grant your deepest desires to intricately crafted wands that beckon with hidden powers, every item in our inventory has been procured from far-off lands and renowned magical artisans. For the avid readers and seekers of knowledge, our extensive library offers shelves lined with ancient grimoires, spellbooks, and volumes of arcane wisdom.",
  };

  const [data, setData] = useState();
  const param = useParams();
  console.log(param);
  const getPortfolio = async () => {
    try {
      const response = await api.get("");
      const data = await response.data;
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <>
      <div className={clsx(s.container)}>
        <div className={clsx(s.introduction)}>
          <span>Welcome to {portfolio.name}</span>
        </div>
        <div className={clsx(s.content)}>
          <div className={clsx(s.description)}>
            <span>{portfolio.description}</span>
          </div>
          <div className={clsx(s.moreInfo)}>
            <span>{portfolio.moreInfo}</span>
          </div>
          <div className={clsx(s.bonusInfo)}>
            <span>{portfolio.bonusInfo}</span>
          </div>
        </div>
      </div>
    </>
  );
}
