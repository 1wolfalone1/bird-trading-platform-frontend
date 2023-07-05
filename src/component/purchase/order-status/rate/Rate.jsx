import { LoadingButton, Rating } from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2";
import clsx from "clsx";
import React from "react";
import * as yup from "yup";
import s from "./rate.module.scss";
import Product from "../../../../component/checkout/products/item/Item";
import { formatNumber } from "../../../../utils/myUtils";
import { useState } from "react";
import { Button, FormHelperText } from "@mui/material";
import ReactQuill from "react-quill";
import { useFormik } from "formik";

export default function Rate({ order, close }) {
  const [value, setValue] = useState();
  const validationSchema = yup.object({
    description: yup
      .string()
      .min(10, "Your review must be at least 100 characters!")
      .required("Review is required to rate!"),
  });

  const form = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const QuillWrapper = ({ field, form, ...props }) => {
    const { name } = field;
    const { setFieldValue } = form;
    const { value } = field;

    const handleChange = (content) => {
      setFieldValue(name, content);
    };
    return (
      <ReactQuill
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={() => form.setFieldTouched(name, true)}
      />
    );
  };
  console.log(order);
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.header)}>
        <div className={clsx(s.title)}>Rate Products</div>
      </div>
      <div className={clsx(s.products)}>
        <div className={clsx(s.productInfo)}>
          {order &&
            order.map((item) => (
              <>
                <Product
                  key={item?.productId}
                  id={item?.productId}
                  name={item?.productName}
                  image={item?.imgUrl}
                  quantity={item?.quantity}
                  price={formatNumber(item.quantity * item.price)}
                />
                <div className={clsx(s.ratingStar)}>
                  Product Quality{" "}
                  <Rating
                    name="simple-controlled"
                    value={value}
                    precision={1}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    size="large"
                    color="Dominant1"
                  />
                </div>
                <div className={clsx(s.commentContent)}>
                  <Grid>
                    <QuillWrapper
                      placeholder="Write your review..."
                      field={form.getFieldProps("description")}
                      form={form}
                    />
                    {form.touched.description && form.errors.description && (
                      <FormHelperText error sx={{ fontSize: "1.6rem" }}>
                        {form.errors.description}
                      </FormHelperText>
                    )}
                  </Grid>
                </div>
              </>
            ))}
        </div>
      </div>
      <div className={clsx(s.footer)}>
        <div className={clsx(s.cancelButton)} onClick={close}>
          <Button>Cancel</Button>
        </div>
        <div className={clsx(s.submitBtn)}>
          <LoadingButton loadingIndicator="Sending..." variant="outlined">
            Submit
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
