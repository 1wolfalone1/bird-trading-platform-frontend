import { LoadingButton, Rating } from "@mui/lab";
import { Button, FormHelperText } from "@mui/material";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../../../api/server/API";
import Product from "../../../../component/checkout/products/item/Item";
import { formatNumber } from "../../../../utils/myUtils";
import s from "./rate.module.scss";

const QuillWrapper = ({ field, form, ...props }) => {
  const { name } = field;
  const { setFieldValue } = form;
  const { value } = field;

  const handleChange = (content) => {
    setFieldValue(name, content);
    console.log(content);
    console.log(name);
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

export default function Rate({ order, close }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [ratings, setRatings] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    description: yup
      .string()
      .min(10, "Your review must be at least 10 characters!")
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

  const handleRatingChange = (productId, newValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: newValue,
    }));
  };

  const handleDescriptionChange = (productId, content) => {
    setDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [productId]: content,
    }));
  };

  const postReview = async (values) => {
    const payload = {};
    try {
      setLoading(true);
      const response = await api.post("", payload);
      setLoading(false);
      console.log(response);
      if (response.status == 200) {
        dispatch();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitReview = async () => {
    postReview(form.values);
  };

  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.header)}>
        <div className={clsx(s.title)}>Rate Products</div>
      </div>
      <div className={clsx(s.products)}>
        {order &&
          order.map((item) => (
            <div className={clsx(s.productInfo)}>
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
                  name={`rating-${item?.productId}`}
                  value={value}
                  precision={1}
                  onChange={(event, newValue) => {
                    handleRatingChange(item?.productId, newValue);
                  }}
                  size="large"
                  color="Dominant1"
                />
              </div>
              <div className={clsx(s.commentContent)}>
                <QuillWrapper
                  placeholder="Write your review..."
                  field={form.getFieldProps(`description-${item?.productId}`)}
                  //   field={form.getFieldProps("description")}
                  form={form}
                  onChange={(content) => {
                    handleDescriptionChange(item?.productId, content);
                  }}
                />
                {form.touched.description && form.errors.description && (
                  <FormHelperText error sx={{ fontSize: "1.6rem" }}>
                    {form.errors.description}
                  </FormHelperText>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className={clsx(s.footer)}>
        <div className={clsx(s.cancelButton)} onClick={close}>
          <Button>Cancel</Button>
        </div>
        <div className={clsx(s.submitBtn)}>
          <LoadingButton
            loadingIndicator="Sending..."
            variant="outlined"
            onClick={handleSubmitReview}
          >
            Submit
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
