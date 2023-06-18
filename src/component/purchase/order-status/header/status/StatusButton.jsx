import clsx from "clsx";
import React from "react";
import s from "./statusButton.module.scss";

export default function StatusButton({ icon, description }) {
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.content)}>
        <div className={clsx(s.icon)}>
          <img src={icon} alt={description} />
        </div>
        <div className={clsx(s.description)}>{description}</div>
      </div>
    </div>
  );
}
