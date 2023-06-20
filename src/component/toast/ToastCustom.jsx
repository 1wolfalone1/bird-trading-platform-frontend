import React from "react";
import { ToastContainer } from "react-toastify";
import s from "./toastCustom.scss";
import { useSelector } from "react-redux";
import { toastStyleSelector } from "../../redux/global/globalConfigSlice";
import clsx from "clsx";
export default function ToastCustom() {
  const style = useSelector(toastStyleSelector);
  return <ToastContainer theme={"light"} className={clsx(style.name)} />;
}
