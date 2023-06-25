import React, { useEffect, useState } from "react";
import s from "./deliveryPopup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import userInfoSlice, {
   userInfoSelector,
} from "../../../redux/global/userInfoSlice";
import Style from "../../../style/inline-style/style";
import clsx from "clsx";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, TextField, Tooltip, Typography } from "@mui/material";
import MapControl from "./../../map-control/MapControl";
import * as yup from "yup";
import { useFormik } from "formik";
const textFieldStyle = {
   marginBottom: "2rem",
   marginTop: "2rem",
   input: {
      color: Style.color.$Complementary0,
      fontFamily: Style.font.$Primary,
      fontSize: "2rem",
   },
   label: {
      fontSize: "2rem",
   },
   ".MuiOutlinedInput-notchedOutline legend": {
      fontSize: "1.5rem",
   },
};

const validationSchema = yup.object({
   name: yup.string("").required("Name is required!"),
   phone: yup
      .string()
      .matches(/^(?!\D)/, "Phone number is not valid!")
      .min(8, "Phone number must be from 8 to 12 digits")
      .max(12, "Phone number must be from 8 to 12 digits")
      .required("Phone number is required!"),
});
export default function DeliveryPopup({
   close,
   deliveryInfo,
   setDeliveryInfo,
}) {
   const { info } = useSelector(userInfoSelector);
   const [address, setAddress] = useState("");
   const [triggers, setTriggers] = useState(0);
   const [isError, setIsError] = useState(0);
   const { errorMsg, setErrorMsg } = useState({
      name: "",
      phoneNumber: "",
      address: "",
   });
   const form = useFormik({
      initialValues: {
         name: deliveryInfo?.fullName,
         phone: deliveryInfo?.phoneNumber,
      },
      onSubmit: (e) => {
         setTriggers((state) => state + 1);
      },
      validationSchema: validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
   });
   const handleSubmitAddress = (address) => {
      setDeliveryInfo((state) => {
         return { ...state, address: address };
      });
   };
   const handleClose = (isError) => {
      setDeliveryInfo((state) => {
         return {
            ...state,
            fullName: form.values.name,
            phoneNumber: form.values.phone,
         };
      });
      if (!isError) {
         setIsError((state) => state + 1);
      }
   };
   useEffect(() => {
      if (isError !== 0 && triggers !== 0) {
         close();
      }
   }, [isError]);
   const dispatch = useDispatch();
   useEffect(() => {
      console.log(deliveryInfo, "asdfasdfasdf in fo deilid");

      setAddress(deliveryInfo?.address);
   }, [deliveryInfo]);
   return (
      <>
         <form className={clsx(s.container)} onSubmit={form.handleSubmit}>
            <div className={clsx(s.header)}>
               <div className={clsx(s.title)}>Your information</div>
               <div className={clsx(s.closeButton)}>
                  <button onClick={close}>&times;</button>
               </div>
            </div>
            <div className={clsx(s.information)}>
               <Grid container columns={12} className={clsx(s.nameAndPhone)}>
                  <Tooltip
                     title={
                        <Typography
                           fontSize={"2rem"}
                           color={Style.color.$Accent1}
                        >
                           {form.values.name}
                        </Typography>
                     }
                  >
                     <Grid sm={6} md={6} xl={6} className={clsx(s.name)}>
                        <TextField
                           id="name"
                           label="Full Name"
                           variant="outlined"
                           color="Dominant0"
                           name="name"
                           value={form.values.name}
                           onChange={form.handleChange}
                           onBlur={form.handleBlur}
                           error={
                              form.touched.name && Boolean(form.errors.name)
                           }
                           FormHelperTextProps={{
                              style: {
                                 fontSize: "1.6rem",
                              },
                           }}
                           helperText={form.touched.name && form.errors.name}
                           sx={textFieldStyle}
                           fullWidth
                        />
                     </Grid>
                  </Tooltip>
                  <Tooltip
                     title={
                        <Typography
                           fontSize={"2rem"}
                           color={Style.color.$Accent1}
                        >
                           {form.values.phone}
                        </Typography>
                     }
                  >
                     <Grid sm={6} md={6} xl={6} className={clsx(s.phone)}>
                        <TextField
                           id="phone"
                           label="Phone Number"
                           variant="outlined"
                           color="Dominant0"
                           name="phone"
                           value={form.values.phone}
                           onChange={form.handleChange}
                           onBlur={form.handleBlur}
                           FormHelperTextProps={{
                              style: {
                                 fontSize: "1.6rem",
                              },
                           }}
                           error={
                              form.touched.phone && Boolean(form.errors.phone)
                           }
                           helperText={form.touched.phone && form.errors.phone}
                           sx={textFieldStyle}
                           fullWidth
                        />
                     </Grid>
                  </Tooltip>
               </Grid>
               <Grid xs={12}>
                  <MapControl
                     w={"100%"}
                     h="300px"
                     triggerSave={triggers}
                     address={address}
                     setOpenModel={handleClose}
                     setAddress={handleSubmitAddress}
                     defaultAddress={`asdfasdfasdfasdfasdf`}
                  />
               </Grid>
            </div>
            <div className={clsx(s.submitBtn)}>
               <Button type="submit">Submit</Button>
            </div>
         </form>
      </>
   );
}
