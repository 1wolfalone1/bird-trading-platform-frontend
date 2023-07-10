import React from "react";
import s from "./collection.module.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "../../../api/server/API";
import { useEffect } from "react";
import clsx from "clsx";

export default function Collection() {
  const [data, setData] = useState();
  const param = useParams();
  console.log(param);
  const getCollection = async () => {
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
    getCollection();
  }, []);
  return (
    <>
      <div className={clsx(s.container)}>Collection</div>
    </>
  );
}
