import React from "react";
import clsx from "clsx";
import s from "../payment/Payment.module.scss";
import PaymentMethod from "./paymentMethod/PaymentMethod";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function Payment({ payment, handleSelectPayment }) {
  console.log(payment);
  return (
    <div>
      <div className={clsx(s.payment)}>
        <div className={clsx(s.title)}>Payment Method</div>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          // defaultValue="PayPal"
          name="radio-buttons-group"
          onChange={(e) => handleSelectPayment(e.target.value)}
        >
          {payment &&
            payment.map((item) => (
              <PaymentMethod
                key={item.id}
                id={item.id}
                image={item.image}
                method={item.method}
                discount={item.discount}
              >
                <FormControlLabel value={item.name} control={<Radio />} />
              </PaymentMethod>
            ))}
        </RadioGroup>
      </div>
    </div>
  );
}
