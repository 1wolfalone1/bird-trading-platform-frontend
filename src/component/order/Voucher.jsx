import React from "react";
import clsx from "clsx";
import s from "../../container/order/cartContainer.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Checkbox, FormControlLabel, Stack } from "@mui/material";

const vouchers = [
  {
    id: 1,
    code: "SUMMER10",
    discount: 10,
    description: "Get 10% off on your purchase.",
    expirationDate: "5/6/2023",
  },
  {
    id: 2,
    code: "FREESHIP",
    discount: 100,
    description: "Free shipping on all orders.",
    expirationDate: "5/6/2023",
  },
  {
    id: 3,
    code: "SALE25",
    discount: 25,
    description: "Save 25% on selected items.",
    expirationDate: "5/6/2023",
  },
  {
    id: 4,
    code: "SALE50",
    discount: 50,
    description: "Save 50% on selected items.",
    expirationDate: "5/6/2023",
  },
  {
    id: 5,
    code: "SALE70",
    discount: 70,
    description: "Save 70% on selected items.",
    expirationDate: "5/6/2023",
  },
  {
    id: 6,
    code: "SALE70",
    discount: 70,
    description: "Save 70% on selected items.",
    expirationDate: "5/6/2023",
  },
  {
    id: 7,
    code: "SALE70",
    discount: 70,
    description: "Save 70% on selected items.",
    expirationDate: "5/6/2023",
  },
  {
    id: 8,
    code: "SALE70",
    discount: 70,
    description: "Save 70% on selected items.",
    expirationDate: "5/6/2023",
  },
  {
    id: 9,
    code: "SALE70",
    discount: 70,
    description: "Save 70% on selected items.",
    expirationDate: "5/6/2023",
  },
  {
    id: 10,
    code: "SALE70",
    discount: 70,
    description: "Save 70% on selected items.",
    expirationDate: "5/6/2023",
  },
];

const handleSubmitBtn = () => {};
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ close }) => (
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
          <div className={clsx(s.containerItem)}>
            <Grid container key={item.id} className={clsx(s.voucher)}>
              <Grid className={clsx(s.voucherItem)}>
                <Grid className={clsx(s.voucherCode)}>Name: {item.code}</Grid>
                {/* <Grid className={clsx(s.voucherDescription)}>
                  Description: {item.description}
                </Grid> */}
                <Grid className={clsx(s.voucherDiscount)}>
                  Reduce: {item.discount}%
                </Grid>
                <Grid className={clsx(s.voucherExpiration)}>
                  Expiration day: {item.expirationDate}
                </Grid>
              </Grid>
            </Grid>
            <Box>
              <Checkbox className={clsx(s.checkboxButton)} />
            </Box>
          </div>
        ))}
      </Stack>
    </div>
    <div>
      <Button className={clsx(s.submitBtn)} onClick={handleSubmitBtn}>
        Done
      </Button>
    </div>
  </div>
);
