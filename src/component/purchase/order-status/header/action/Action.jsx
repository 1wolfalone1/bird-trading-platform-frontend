import clsx from "clsx";
import React from "react";
import s from "./action.module.scss";
import { Button } from "@mui/material";

export default function Action({ action }) {
  const handleRate = () => {
    // status of all products in the shop done, then can rate
    return true;
  };
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.action)}>
        <Button
          disabled={handleRate()}
          style={{ opacity: handleRate() ? 0.5 : 1 }}
        >
          Rate
        </Button>
        <Button>Chat with Shop</Button>
      </div>
    </div>
  );
}
