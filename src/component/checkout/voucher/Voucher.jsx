import React from "react";
import clsx from "clsx";
import s from "../voucher/Voucher.module.scss";
import VoucherItem from "./item/VoucherItem";

export default function Voucher({ vouchers }) {
  return (
    <div>
      <div className={clsx(s.vouchers)}>
        <div className={clsx(s.title)}>Vouchers</div>
        {vouchers &&
          vouchers.map((item) => (
            <VoucherItem
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              reduce={item.reduce}
            ></VoucherItem>
          ))}
      </div>
    </div>
  );
}
