import React from "react";
import clsx from "clsx";
import s from "../payment/Payment.module.scss";
import PaymentMethod from "./paymentMethod/PaymentMethod";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function Payment({ payment }) {
  return (
    <div>
      <div className={clsx(s.payment)}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="paypal"
          name="radio-buttons-group"
        >
          <div className={clsx(s.title)}>Payment Method</div>
          {payment &&
            payment.map((item) => (
              <PaymentMethod
                key={item.id}
                id={item.id}
                image={item.image}
                method={item.method}
                discount={item.discount}
              >
                <FormControlLabel
                  value={item.name}
                  control={<Radio />}
                  // label={item.name}
                />
              </PaymentMethod>
            ))}
        </RadioGroup>
      </div>
    </div>
  );
}
