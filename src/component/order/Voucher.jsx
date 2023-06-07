import React from "react";
import clsx from "clsx";
import s from "../../container/order/cartContainer.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, {
  getListItemSelector,
  getVouchersSelector,
} from "../../container/order/cartSlice";

//

const handleSubmitBtn = () => {};
// eslint-disable-next-line import/no-anonymous-default-export
export default function Voucher({ close }) {
  const vouchers = useSelector(getVouchersSelector);
  const a = useSelector(getListItemSelector);
  const dispatch = useDispatch();
  console.log(vouchers, a);

  const [checkedValues, setCheckedValues] = useState([]);
  const handleChange = (event) => {
    console.log(checkedValues);
    const valueString = event.target.value;
    const value = JSON.parse(valueString ? valueString : {});
    let isChecked = true;
    if (
      vouchers.find((v) => {
        if (v.id === value.id) {
          return v.checked;
        }
      })
    ) {
      isChecked = false;
    }
    const newVouchers = vouchers.map((val) => {
      if (val.id === value.id) {
        return { ...val, checked: isChecked };
      } else {
        return val;
      }
    });
    console.log(newVouchers);
    dispatch(cartSlice.actions.updateVoucher(newVouchers));
  };

  return (
    <div className={clsx(s.modal)}>
      <div className={clsx(s.headerVoucher)}>
        <div className={clsx(s.title)}>Select Vouchers</div>
        <button className={clsx(s.close)} onClick={close}>
          &times;
        </button>
      </div>

      <div className={clsx(s.voucherListContainer)}>
        <Stack className={clsx(s.voucherList)}>
          {vouchers.map((item) => (
            <div className={clsx(s.containerItem)} key={item.id}>
              <Grid container key={item.id} className={clsx(s.voucher)}>
                <Grid className={clsx(s.voucherItem)}>
                  <Grid className={clsx(s.voucherCode)}>Name: {item.code}</Grid>
                  <Grid className={clsx(s.voucherDescription)}>
                    Description: {item.description}
                  </Grid>
                  <Grid className={clsx(s.voucherDiscount)}>
                    Reduce: {item.discount}%
                  </Grid>
                  <Grid className={clsx(s.voucherExpiration)}>
                    Expiration day: {item.expirationDate}
                  </Grid>
                </Grid>
              </Grid>
              <Box>
                <Checkbox
                  value={JSON.stringify(item)}
                  className={clsx(s.checkboxButton)}
                  checked={item.checked}
                  onChange={handleChange}
                />
              </Box>
            </div>
          ))}
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
