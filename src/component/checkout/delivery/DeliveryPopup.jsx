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

const LOCATION_API_URL = "https://provinces.open-api.vn/api";

export default function DeliveryPopup({ close }) {
   const { info } = useSelector(userInfoSelector);
   const [formInfo, setFormInfo] = useState(info);
   const [fullName, setFullName] = useState("");
   const [address, setAddress] = useState();
   const dispatch = useDispatch();

   useEffect(() => {
         setAddress(info?.address);
   }, []);
   const selectOption = {
      backgroundColor: "rgb(255, 235, 235)",
      fontSize: "2rem",
      height: "6rem",
   };
   const handleSubmit = () => {
      dispatch(userInfoSlice.actions.updateUserInfo(formInfo));
      close();
   };

   const handleFullNameChange = (e) => {
      setFullName(e.target.value);
   };

   const handleUpdateProfile = (e) => {
      const { name, value } = e.target;
      switch (name) {
         case "fullName":
            setFormInfo((prev) => ({
               ...prev,
               fullName: value,
            }));
            break;
         case "phoneNumber":
            setFormInfo((prev) => ({
               ...prev,
               phoneNumber: value,
            }));
            break;
         default:
            break;
      }
   };

   return (
      <>
         <div className={clsx(s.container)}>
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
                           {info.fullName}
                        </Typography>
                     }
                  >
                     <Grid sm={6} md={6} xl={6} className={clsx(s.name)}>
                        <TextField
                           id="fullName"
                           label="Full Name"
                           variant="outlined"
                           color="Dominant0"
                           value={formInfo?.fullName}
                           name="fullName"
                           onChange={(e) => handleUpdateProfile(e)}
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
                           {info.phoneNumber}
                        </Typography>
                     }
                  >
                     <Grid sm={6} md={6} xl={6} className={clsx(s.phone)}>
                        <TextField
                           id="phoneNumber"
                           label="Phone Number"
                           variant="outlined"
                           color="Dominant0"
                           value={formInfo?.phoneNumber}
                           name="phoneNumber"
                           onChange={(e) => handleUpdateProfile(e)}
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
                     address={address}
                     setAddress={setAddress}
                  />
               </Grid>
            </div>
            <div className={clsx(s.submitBtn)}>
               <Button onClick={handleSubmit}>Submit</Button>
            </div>
         </div>
      </>
   );
}
