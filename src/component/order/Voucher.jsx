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
import { useDispatch, useSelector } from "react-redux";
import cartSlice, {
  getVoucherSelectedSelector,
  totalPriceSelector,
} from "../../container/order/cartSlice";
import { getAllPromotions } from "../../api/server/promotions/PromotionAPI";
import { formatNumber } from "../../utils/myUtils";

export default function Voucher({ close }) {
  const total = useSelector(totalPriceSelector);
  const voucherSelected = useSelector(getVoucherSelectedSelector);
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
      <div className={clsx(s.header)}>
        <div className={clsx(s.title)}>Select Vouchers</div>
        <div className={clsx(s.closeButton)}>
          <button onClick={close}>&times;</button>
        </div>
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
                  <div
                    className={clsx(s.containerItem, {
                      [s.disabled]:
                        total < item.minimumOrderValue ||
                        item.used >= item.usageLimit,
                    })}
                    key={item.id}
                  >
                    <Grid container key={item.id} className={clsx(s.voucher)}>
                      <Grid className={clsx(s.voucherItem)}>
                        <Grid className={clsx(s.voucherCode)}>
                          Name: {item.name}
                        </Grid>
                        <Grid className={clsx(s.voucherDescription)}>
                          Description:
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </Grid>
                        <Grid className={clsx(s.voucherExpiration)}>
                          Valid Till:{" "}
                          {new Date(item.endDate).toLocaleDateString("en-GB")}
                        </Grid>
                        <Grid className={clsx(s.usage)}>
                          Used: {item.used}/{item.usageLimit}
                        </Grid>
                        <Grid className={clsx(s.text)}>
                          Minimum total order:{" "}
                          {formatNumber(item.minimumOrderValue)}
                        </Grid>
                      </Grid>
                    </Grid>
                    <FormControlLabel
                      disabled={
                        total < item.minimumOrderValue ||
                        item.used >= item.usageLimit
                      }
                      control={
                        <Radio
                          value={JSON.stringify(item)}
                          className={clsx(s.checkboxButton)}
                          checked={item.id === voucherSelected?.shipping?.id}
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
                  <div
                    className={clsx(s.containerItem, {
                      [s.disabled]:
                        total < item.minimumOrderValue ||
                        item.used >= item.usageLimit,
                    })}
                    key={item.id}
                  >
                    <Grid container key={item.id} className={clsx(s.voucher)}>
                      <Grid className={clsx(s.voucherItem)}>
                        <Grid className={clsx(s.voucherCode)}>
                          Name: {item.name}
                        </Grid>
                        <Grid className={clsx(s.voucherDescription)}>
                          Description:
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </Grid>
                        <Grid className={clsx(s.voucherDiscount)}>
                          Discount: -{formatNumber(item.discount)}
                        </Grid>
                        <Grid className={clsx(s.voucherExpiration)}>
                          Valid Till:{" "}
                          {new Date(item.endDate).toLocaleDateString("en-GB")}
                        </Grid>
                        <Grid className={clsx(s.usage)}>
                          Used: {item.used}/{item.usageLimit}
                        </Grid>
                        <Grid className={clsx(s.text)}>
                          Minimum total order:{" "}
                          {formatNumber(item.minimumOrderValue)}
                        </Grid>
                      </Grid>
                    </Grid>
                    <FormControlLabel
                      disabled={
                        total < item.minimumOrderValue ||
                        item.used >= item.usageLimit
                      }
                      control={
                        <Radio
                          value={JSON.stringify(item)}
                          className={clsx(s.checkboxButton)}
                          checked={item.id === voucherSelected?.discount?.id}
                          onChange={handleChangeDiscountVoucher(item)}
                        />
                      }
                    />
                  </div>
                ))}
          </RadioGroup>
        </Stack>
      </div>
      <div className={clsx(s.submitBtn)}>
        <Button onClick={close}>Done</Button>
      </div>
    </div>
  );
}
