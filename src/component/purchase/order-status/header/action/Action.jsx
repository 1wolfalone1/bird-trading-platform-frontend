import clsx from "clsx";
import React from "react";
import s from "./action.module.scss";
import { Button } from "@mui/material";

export default function Action({ action }) {
  const handleRate = () => {
    return false;
  };
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.action)}>
        <Button disabled={handleRate()}>Rate</Button>
        <Button>Contact</Button>
        <Button>Buy Again</Button>
      </div>
    </div>
  );
}
