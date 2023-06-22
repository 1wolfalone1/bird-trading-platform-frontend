import clsx from "clsx";
import s from "./createShop.module.scss";
import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import Style from "../../style/inline-style/style";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import ButtonGoogle from "../../component/buttonGoogle/ButtonGoogle";
import * as yup from "yup";
import { useFormik } from "formik";
import { registerAPI } from "../../api/server/RegisterAPI";
import { LoadingButton } from "@mui/lab";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormHelperText } from "@mui/material";
import Modal from "@mui/material/Modal";
import MapControl from "../../component/map-control/MapControl";
import { Typography } from "@mui/material";
import { api } from "../../api/server/API";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { dataAsyncUrlToFile, objectToBlob } from "../../utils/myUtils";
const textFieldStyle = {
   input: {
      color: Style.color.$Complementary0,
      fontSize: "1.8rem",
      fontFamily: Style.font.$Primary,
   },
   label: {
      fontSize: "1.8rem",
   },
   ".MuiOutlinedInput-notchedOutline legend": {
      fontSize: "1.5rem",
   },
};
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
   fontSize: "2.4rem",
};
const formHelperText = {
   style: {
      fontSize: "1.6rem",
      color: "red",
      marginLeft: "0px",
   },
};
const validationSchema = yup.object({
   name: yup.string("").required("Name is required!"),
   phone: yup
      .string()
      .matches(/^(?!\D)/, "Phone number is not valid!")
      .required("Phone number is required!"),
   description: yup
      .string()
      .min(100, "Description must be at least 100 characters long")
      .required("Description is required!"),
});
export default function CreateShop() {
   const [openModel, setOpenModel] = useState(false);
   const [avatar, setAvatar] = useState();
   const [loading, setLoading] = useState(false);
   const [address, setAddress] = useState("");
   const [triggers, setTriggers] = useState(0);
   const [errorCustom, setErrorCustom] = useState({
      avatar: "",
      address: "",
   });
   const onFormSubmit = async (e) => {
      try {
         console.log(e);
         e.preventDefault();
         handleSubmit();
      } catch (error) {
         console.error(error);
      }
   };

   const form = useFormik({
      initialValues: {
         name: "",
         address: "",
         description: "",
      },
      validationSchema: validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
   });
   useEffect(() => {
      console.log(address);
   }, [address]);
   const handleSubmit = async () => {
      console.log(form.values);
      const e = await form.validateForm(form.values);
      form.setTouched(
         {
            email: true,
            name: true,
            address: true,
            phone: true,
            password: true,
            confirmPassword: true,
         },
         false
      );

      if (form.values.password !== form.values.confirmPassword) {
         form.setErrors({
            ...e,
            confirmPassword: "Confirm password not match!",
         });
      } else {
         form.setErrors({
            ...e,
         });
      }
      let count = 0;
      if (avatar?.obj === undefined) {
         count++;
         setErrorCustom((state) => {
            return { ...state, avatar: "Shop avatar is required!" };
         });
      }
      if (!address) {
         count++;
         setErrorCustom((state) => {
            return { ...state, address: "Address is required!" };
         });
      }
      if (form.isValid) {
         if (count === 0) {
            postRegister(form.values);
         }
      }
   };
   const postRegister = async (values) => {
      const dataTransfer = {
         phoneShop: +values.phone,
         shopName: values.name,
         description: values.description,
         shopAddress: address,
      };
      try {
         setLoading(true);
         const formData = new FormData();
         console.log(dataTransfer);
         const avatarBlob = await dataAsyncUrlToFile(avatar.src);
         console.log(avatarBlob)
         formData.append("image", avatarBlob);
         const dataBlob = objectToBlob(dataTransfer);
         formData.append("data", dataBlob);
         const response = await api.post("/shop-owner", formData, {
            headers: {
               "Content-type": "multipart/form-data",
            },
         });
         const data = await response.data
         console.log(data);
         setLoading(false);
      } catch (e) {
         console.log(e);
         setLoading(false);
         if (e.response.status === 406) {
            form.setErrors({ ...form.errors, email: "Email already exists!" });
         }
      }
   };

   const handleUpdateAvatar = (e) => {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
         files = e.dataTransfer.files;
      } else if (e.target) {
         files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
         const newAvatar = reader.result;
         setAvatar({
            src: newAvatar,
            obj: files[0],
         });
      };
      if (files[0]) reader?.readAsDataURL(files[0]);
   };

   console.log(form.errors);
   return (
      <>
         <div className={clsx(s.title)}>
            <span>Create Shop Account</span>
         </div>
         <Grid container className={clsx(s.container)}>
            <Grid sm={3} md={3} xl={3} className={clsx(s.uploadImg)}>
               <div className={clsx(s.imgProfile)}>
                  <img
                     src={
                        avatar?.src ||
                        "https://static.thenounproject.com/png/5034901-200.png"
                     }
                     alt="Avatar"
                  />
               </div>
               <input
                  type="file"
                  name="avatar"
                  id="customFile"
                  hidden
                  onChange={handleUpdateAvatar}
               />
               <label className={clsx(s.editProfile)} htmlFor="customFile">
                  Choose Avatar
               </label>
               {!avatar?.obj ? (
                  <FormHelperText error sx={{ fontSize: "1.6rem" }}>
                     {errorCustom.avatar}
                  </FormHelperText>
               ) : (
                  ""
               )}
            </Grid>
            
            <Grid sm={9} md={9} xl={9} className={clsx(s.contentRight)}>
               <form onSubmit={onFormSubmit} className={clsx(s.formBordered)}>
                  <Grid container spacing={1} className={clsx(s.info)}>
                     <Grid sm={6} md={6} xl={6} className={clsx(s.password)}>
                        <TextField
                           id="name"
                           label="Shop Name"
                           variant="outlined"
                           color="Dominant0"
                           value={form.values.name}
                           onChange={form.handleChange}
                           onBlur={form.handleBlur}
                           error={
                              form.touched.name && Boolean(form.errors.name)
                           }
                           helperText={form.touched.name && form.errors.name}
                           sx={textFieldStyle}
                           FormHelperTextProps={formHelperText}
                           fullWidth
                        />
                     </Grid>
                     <Grid sm={6} md={6} xl={6} className={clsx(s.password)}>
                        <TextField
                           id="phone"
                           label="Phone Number"
                           variant="outlined"
                           color="Dominant0"
                           value={form.values.phone}
                           onChange={form.handleChange}
                           onBlur={form.handleBlur}
                           error={
                              form.touched.phone && Boolean(form.errors.phone)
                           }
                           helperText={form.touched.phone && form.errors.phone}
                           sx={textFieldStyle}
                           FormHelperTextProps={formHelperText}
                           fullWidth
                        />
                     </Grid>
                  </Grid>
                  <Grid
                     className={clsx(s.address)}
                     sx={{ display: "flex", flexDirection: "column" }}
                  >
                     <Tooltip
                        title={
                           <Typography
                              fontSize={"2rem"}
                              color={Style.color.$Accent1}
                           >
                              {address}
                           </Typography>
                        }
                     >
                        <Grid container sx={{ width: "100%" }}>
                           <Grid
                              xs={8}
                              sx={{
                                 display: "flex",
                                 alignItems: "center",
                                 border: "1px solid #6a6a6a",
                                 borderTopLeftRadius: "5px",
                                 borderBottomLeftRadius: "5px",
                                 padding: "0",
                              }}
                           >
                              <Typography
                                 noWrap
                                 sx={{
                                    fontSize: "2.4rem",
                                    paddingLeft: "1rem",
                                    color: "#7d7d7d",
                                    width: "100%",
                                 }}
                              >
                                 {address ? address : "You don't have address"}
                              </Typography>
                           </Grid>
                           <Grid xs={4} sx={{ display: "flex" }}>
                              <Button
                                 color="Accent8"
                                 sx={{
                                    fontSize: "2.4rem",
                                    borderRadius: "0",
                                    borderTopRightRadius: "5px",
                                    borderBottomRightRadius: "5px",
                                 }}
                                 fullWidth
                                 variant="contained"
                                 onClick={() => {
                                    setOpenModel(true);
                                    setTriggers(0);
                                 }}
                              >
                                 Change
                              </Button>
                           </Grid>
                        </Grid>
                     </Tooltip>
                     {!address ? (
                        <FormHelperText error sx={{ fontSize: "1.6rem" }}>
                           {errorCustom.address}
                        </FormHelperText>
                     ) : (
                        ""
                     )}
                  </Grid>

                  {/* <ReactQuill 
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
         /> */}
                  <Grid>
                     <QuillWrapper
                        placeholder="Write description here..."
                        field={form.getFieldProps("description")}
                        form={form}
                     />
                     {form.touched.description && form.errors.description && (
                        <FormHelperText error sx={{ fontSize: "1.6rem" }}>
                           {form.errors.description}
                        </FormHelperText>
                     )}
                  </Grid>

                  <Grid className={clsx(s.button)}>
                     <LoadingButton
                        sx={buttonRegisterStyle}
                        color="Accent7"
                        endIcon={<AddBusinessIcon sx={{ fontSize: "3rem" }} />}
                        loading={loading}
                        type="button"
                        loadingPosition="end"
                        onClick={handleSubmit}
                        variant="contained"
                     >
                        Create Shop
                     </LoadingButton>
                  </Grid>
               </form>
            </Grid>
            <Modal
               open={openModel}
               aria-labelledby="parent-modal-title"
               aria-describedby="parent-modal-description"
            >
               <div className={s.model}>
                  <MapControl
                     address={address}
                     setAddress={setAddress}
                     triggerSave={triggers}
                     w="70rem"
                     h="40rem"
                     setOpenModel={setOpenModel}
                  />
                  <div className={s.buttonControl}>
                     <Button
                        onClick={() => {
                           setOpenModel(false);
                           setTriggers(0);
                        }}
                        variant="contained"
                        color="Accent8"
                        sx={{ fontSize: "1.6rem" }}
                     >
                        Back
                     </Button>
                     <Button
                        variant="contained"
                        color="Accent8"
                        sx={{ fontSize: "1.6rem" }}
                        onClick={() => setTriggers((state) => state + 1)}
                     >
                        Save
                     </Button>
                  </div>
               </div>
            </Modal>
         </Grid>
      </>
   );
}
