import React from "react";
import clsx from "clsx";
import s from "../voucher/Voucher.module.scss";
import VoucherItem from "./item/VoucherItem";

export default function Voucher({ vouchers }) {
  return (
    <div>
      <div className={clsx(s.vouchers)}>
        <div className={clsx(s.title)}>Vouchers</div>
        {vouchers?.discount && (
          <VoucherItem
            key={vouchers.id}
            id={vouchers.id}
            name={vouchers.discount?.name}
            reduce={vouchers.discount?.discount}
          ></VoucherItem>
        )}
        {vouchers?.shipping && (
          <VoucherItem
            key={vouchers.id}
            id={vouchers.id}
            name={vouchers.shipping?.name}
            reduce="Freeship"
          ></VoucherItem>
        )}
      </div>
    </div>
  );
}
