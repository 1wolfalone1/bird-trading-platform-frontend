import { AddPhotoAlternateOutlined, RemoveCircleOutlined } from "@mui/icons-material";
import { LoadingButton, Rating } from "@mui/lab";
import { Box, FormHelperText, IconButton } from "@mui/material";
import clsx from "clsx";
import { useFormik } from 'formik';
import React, { useRef, useState } from "react";
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import * as yup from "yup";
import { api } from "../../../../../api/server/API";
import { dataAsyncUrlToFile, formatNumber, objectToBlob } from "../../../../../utils/myUtils";
import ProductItem from "../../../../checkout/products/item/Item";
import AddToCartToast, { toastType } from "../../../../toast/content/AddToCartToast";
import rateSlice, { getListReivewBaseOnOrderDetail, rateSliceSelector } from "../rateSlice";
import s from './itemRate.module.scss';

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
  
  const buttonRegisterStyle = {
    textTransform: "none",
    fontSize: "3rem",
    width: "100%",
    padding: "1rem",
  };

const ItemRate = ({item, initialValues, isHaveValue, listImage, orderId}) => {
    const dispatch = useDispatch();
    const {listImagesPreview, numberRated} = useSelector(rateSliceSelector);
    const [value, setValue] = useState(initialValues.ratings);
    const [reviewImage, setReviewImage] = useState();
    const [ratings, setRatings] = useState({});
    const [descriptions, setDescriptions] = useState({});
    const [loading, setLoading] = useState(false);
    const hiddenFileRef = useRef(null);

    console.log('here is an bird infor', initialValues);

    const validationSchema = yup.object({
        description: yup
        .string()
        .min(10, "Your review must be at least 10 characters!"),
        ratings: yup
        .number()
        .min(1, "Please choose star!")
        .required("Star is required to rate!"),
    });
  
    const form = useFormik({
      initialValues: {
        description: "",
        ratings: 5,
      },
      validationSchema: validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
    });
  
    const handleDescriptionChange = (productId, content) => {
      setDescriptions((prevDescriptions) => ({
        ...prevDescriptions,
        [productId]: content,
      }));
    };
  
    const postReview = async (values, resetForm ) => {
      const rate = {
        orderDetailId: item.orderDetailId,
        productId: item?.productId,
        description: values.description,
        rating: values.ratings
      };
      try {
        setLoading(true);
        const formData = new FormData();
        //add a list images
        listImagesPreview[item.productId]?.map(image =>  formData.append("image", image.file));
        const dataBlob = objectToBlob(rate);
        formData.append("data", dataBlob);
        const response = await api.post("/users/reviews", formData, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          });
        setLoading(false);
        console.log(response);
        if (response.status == 200) {
          dispatch(rateSlice.actions.resetImagesPreview());
          toast(
            <AddToCartToast
            type={toastType.SUCCESS}
            msg={"Review Success!"}
            />,
            {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
            }
          );
          dispatch(getListReivewBaseOnOrderDetail(orderId));
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        toast(
          <AddToCartToast
          type={toastType.WARNING_INPUT}
          msg={"Review fail!"}
          />,
          {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          }
      );
      }
    };

    const handleSubmitReview = async ({resetForm }) => {
        if (form.isValid) {
          // if (count === 0) {
            postReview(form.values, resetForm );
          // }
        }else {
          console.log('FORM NOT VALID')
        }
    };

    const handleUpdateReviewImages = async(e) => {
       if(listImagesPreview[item.productId] == null || listImagesPreview[item.productId]?.length < 3) {
            e.preventDefault();
            let files;
            if (e.dataTransfer) {
            files = e.dataTransfer.files;
            } else if (e.target) {
            files = e.target.files;
            }
            const reader = new FileReader();
            reader.onload = async() => {
            const newAvatar = reader.result;
            setReviewImage({
                src: newAvatar,
                obj: files[0],
            });   
            const reviewImagesFile =  await dataAsyncUrlToFile(reader.result);
            const productID = item?.productId ;
            dispatch(rateSlice.actions.addImagesPreview({
                objectImage : {
                  id: item?.productId,
                  src: newAvatar,
                  file: reviewImagesFile,
                  imageId: v4(),
                  },
                productId: productID,
            }));    
            };
            if (files[0]) reader?.readAsDataURL(files[0]);
       }else {
            toast(
                <AddToCartToast
                type={toastType.WARNING_INPUT}
                msg={"Only 3 picture!"}
                />,
                {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
                }
            );
       }
      };

    const handleChooseImage = () => {
        hiddenFileRef.current.click();
    }
    const handleRemoveImage = (id) => {
        dispatch(rateSlice.actions.removeImagesPreview({id: id, productId: item.productId}));
    }
  return (
    <div className={clsx(s.container)}>
        <div className={clsx(s.productInfo)}>
            <form onSubmit={handleSubmitReview}>
                <ProductItem
                key={item?.productId}
                id={item?.productId}
                name={item?.productName}
                image={item?.imgUrl}
                quantity={item?.quantity}
                price={formatNumber(item.quantity * item.price)}
                />
                {!isHaveValue ?
                  <><div className={clsx(s.ratingStar)}>
                  Product Quality{" "}
                  <Rating
                      name={`ratings`}
                      value={form.values.ratings}
                      precision={1}
                      onChange={form.handleChange}
                      size="large"
                      color="Dominant1"
                  />
                  </div>
                  {form.touched.ratings && form.errors.ratings && (
                      <FormHelperText error sx={{ fontSize: "1.6rem" }}>
                      {form.errors.ratings}
                      </FormHelperText>
                  )}
                  <div className={clsx(s.commentContent)}>
                  <QuillWrapper
                      placeholder="Write your review..."
                      field={form.getFieldProps(`description`)}
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
                  <Box sx={{display: 'flex', justifyItems: 'center', alignItems: 'center'}}>
                  { listImagesPreview[item.productId] && 
                      listImagesPreview[item.productId]
                      .map(image => 
                         <Box  
                          key={image.imageId}
                          sx={{position: 'relative', display: 'flex'}}
                         > 
                          <IconButton 
                          sx={{position: 'absolute', top: '0', right: '0'}}
                          onClick={() => handleRemoveImage(image.imageId)}
                          >
                              <RemoveCircleOutlined color="error" sx={{fontSize: '3rem'}}/>
                          </IconButton>
                          <img
                          src={image.src}
                          className={clsx(s.previewImage)}
                          />
                         </Box>
                      )
                  }
                  <Box 
                      sx={{height: '150px', width: '150px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: "column",
                          gap: '1.3rem',
                          '&:hover': {
                              cursor: 'pointer',
                              backgroundColor: 'Dominant5',
                              boxShadow: "0px 0px 10px #201f1fc0",
                          },
                          transition: '0.2s linear'   
                      }}
                      className={clsx(s.previewImage)}
                      onClick={handleChooseImage}
                  >
                      <AddPhotoAlternateOutlined 
                      sx={{  fontSize: '3rem',
                          color: 'red'}} />
                      <span style={{ textAlign: "center", fontSize: '2rem' }}>
                          Add image
                      </span>
                  <input
                      type="file"
                      style={{ display: "none" }}
                      name="reviewImg"
                      id="customFile"
                      ref={hiddenFileRef}
                      onChange={handleUpdateReviewImages}
                      accept="image/*"
                      className={clsx(s.btnUploadFile)}
                  />
                  </Box>
  
                  </Box>

                    <div className={clsx(s.submitBtn)}>
                    <LoadingButton
                        sx={buttonRegisterStyle}
                        variant="outlined"
                        color="Accent7"
                        fullWidth
                        type="button"
                        onClick={handleSubmitReview}
                        loading={loading}
                    >
                        Submit
                    </LoadingButton>
                    </div>
                  </> :
                  <>
                    <div className={clsx(s.ratingStar)}>
                    Product Quality{" "}
                    <Rating
                        name={`ratings`}
                        value={value}
                        precision={1}
                        size="large"
                        color="Dominant1"
                    />
                    </div>
                    { initialValues.description && <Box className={clsx(s.commentContent)}>
                      <span>Comment: </span>
                    <div dangerouslySetInnerHTML={{ __html: initialValues.description }} style={{border: '1px solid #333333', padding: '10px'}}/>
                    </Box>}
                    {  listImage?.length > 0 &&
                      <Box>
                      <span style={{marginBottom: '20px'}}>Images:</span>
                      <Box>
                        {listImage?.map(img => {
                          return <img src={img} className={clsx(s.previewImage)}/>
                        })}
                      </Box>
                    </Box>
                    }
                  
                  </>
                }
            </form>
        </div>
    </div>
  )
}

export default ItemRate