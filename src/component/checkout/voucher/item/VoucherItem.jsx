import React, { Fragment } from "react";
import clsx from "clsx";
import s from "./VoucherItem.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { formatNumber } from "../../../../utils/myUtils";

const VoucherItem = ({ id, name, reduce }) => {
  const imageShipping =
    "https://img.meta.com.vn/Data/image/2020/10/29/freeship-la-gi-4.jpg";
  const imageDiscount =
    "https://www.pngall.com/wp-content/uploads/2016/04/Discount-PNG-Picture.png";
  if (!id) {
    console.log("No voucher chosen");
    <div>You haven't chosen any vouchers</div>;
  }

  return (
    <Fragment>
      {console.log("Rendering vouchers")}
      <Grid container columns={10} key={id} className={clsx(s.container)}>
        <Grid sm={5} md={5} xl={5} className={clsx(s.voucher)}>
          <Grid className={clsx(s.voucherImage)}>
            {name.includes("Discount") ? (
              <img src={imageDiscount} alt={name} />
            ) : (
              <img src={imageShipping} alt={name} />
            )}
          </Grid>
          <Grid className={clsx(s.voucherName)}>{name}</Grid>
        </Grid>
        <Grid sm={4} md={4} xl={4} className={clsx(s.reduce)}>
          {name.includes("Discount")
            ? `Discount -${formatNumber(reduce)}`
            : "Freeship"}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default VoucherItem;
