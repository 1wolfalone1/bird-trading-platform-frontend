import React, { useEffect } from "react";
import clsx from "clsx";
import s from "../../container/order/cartContainer.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import cartSlice from "../../container/order/cartSlice";
import { getAllPromotions } from "../../api/server/promotions/PromotionAPI";

export default function Voucher({ close }) {
  const [vouchers, setVouchers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadVouchers = async () => {
      const vouchers = await getAllPromotions();
      setVouchers((prev) => vouchers);
    };
    loadVouchers();
  }, []);

  const handleChangeShippingVoucher = (item) => {
    return (event) => {
      dispatch(cartSlice.actions.updateVoucherSelectedShipping(item));
    };
  };

  const handleChangeDiscountVoucher = (item) => {
    return (event) => {
      dispatch(cartSlice.actions.updateVoucherSelectedDiscount(item));
    };
  };

  return (
    <div className={clsx(s.modal)}>
      <div className={clsx(s.headerVoucher)}>
        <div className={clsx(s.title)}>Select Vouchers</div>
      </div>
      <div className={clsx(s.voucherListContainer)}>
        <Stack className={clsx(s.voucherList)}>
          <h4 className={clsx(s.voucherShipping)}>
            Shipping Vouchers (1 voucher can be selected)
          </h4>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            {vouchers &&
              vouchers
                .filter((voucher) => voucher?.type === "SHIPPING")
                .map((item) => (
                  <div className={clsx(s.containerItem)} key={item.id}>
                    <Grid container key={item.id} className={clsx(s.voucher)}>
                      <Grid className={clsx(s.voucherItem)}>
                        <Grid className={clsx(s.voucherCode)}>
                          Name: {item.name}
                        </Grid>
                        <Grid className={clsx(s.voucherDescription)}>
                          Description: {item.description}
                        </Grid>
                        <Grid className={clsx(s.voucherExpiration)}>
                          Valid Till:
                          {new Date(item.endDate).toLocaleDateString("en-GB")}
                        </Grid>
                      </Grid>
                    </Grid>
                    <FormControlLabel
                      control={
                        <Radio
                          value={JSON.stringify(item)}
                          className={clsx(s.checkboxButton)}
                          checked={item.checked}
                          onChange={handleChangeShippingVoucher(item)}
                        />
                      }
                    />
                  </div>
                ))}
          </RadioGroup>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            <h4 className={clsx(s.voucherDiscount)}>
              Discount Vouchers (1 voucher can be selected)
            </h4>
            {vouchers &&
              vouchers
                .filter((voucher) => voucher?.type === "DISCOUNT")
                .map((item) => (
                  <div className={clsx(s.containerItem)} key={item.id}>
                    <Grid container key={item.id} className={clsx(s.voucher)}>
                      <Grid className={clsx(s.voucherItem)}>
                        <Grid className={clsx(s.voucherCode)}>
                          Name: {item.name}
                        </Grid>
                        <Grid className={clsx(s.voucherDescription)}>
                          Description: {item.description}
                        </Grid>
                        <Grid className={clsx(s.voucherDiscount)}>
                          Discount: {item.discount}$
                        </Grid>
                        <Grid className={clsx(s.voucherExpiration)}>
                          Valid Till:
                          {new Date(item.endDate).toLocaleDateString("en-GB")}
                        </Grid>
                      </Grid>
                    </Grid>
                    <FormControlLabel
                      control={
                        <Radio
                          value={JSON.stringify(item)}
                          className={clsx(s.checkboxButton)}
                          checked={item.checked}
                          onChange={handleChangeDiscountVoucher(item)}
                        />
                      }
                    />
                  </div>
                ))}
          </RadioGroup>
        </Stack>
      </div>
      <div>
        <Button className={clsx(s.submitBtn)} onClick={close}>
          Done
        </Button>
      </div>
    </div>
  );
}
