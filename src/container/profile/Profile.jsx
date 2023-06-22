import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import {
   Button,
   IconButton,
   Modal,
   Skeleton,
   TextField,
   Tooltip,
   Typography,
} from "@mui/material";
import s from "./profile.module.scss";
import Style from "../../style/inline-style/style";
import img from "../../asset/leftImagLogin.jpg";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import userInfoSlice, {
   userInfoDetailsSelector,
   userInfoSelector,
} from "../../redux/global/userInfoSlice";
import axios from "axios";
import { api } from "../../api/server/API";
import Grid from "@mui/material/Unstable_Grid2";
import { dataAsyncUrlToFile, objectToBlob } from "../../utils/myUtils";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MapControl from "../../component/map-control/MapControl";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ButtonControl from "./../../component/side-bar-filter/ButtonControl";
import globalConfigSlice from "../../redux/global/globalConfigSlice";
const textFieldStyle = {
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

const Profile = () => {
   const [avatar, setAvatar] = useState();
   const [isEditable, setIsEditable] = useState(false); // Editable state for the fields
   const dispatch = useDispatch();
   const info = useSelector(userInfoDetailsSelector);
   const [openModel, setOpenModel] = useState(false);
   const [triggers, setTriggers] = useState(0);
   const [formInfo, setFormInfo] = useState();
   const [address, setAddress] = useState();
   useEffect(() => {
      console.log(info, "info nefasdfasdfasdfasdfasdfasdfasdfasdf");
      setFormInfo(info);
      setAddress(info?.address);
   }, [info]);
   console.log(info, "info neasdfasdfasdfasdfasdfasd");

   const handleUpdateAvatar = (e) => {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
         files = e.dataTransfer.files;
      } else if (e.target) {
         files = e.target.files;
      }
      console.log(files, "file ne");
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

   async function updateProfile(data) {
      console.log(data);
      console.log(address, "-------herere ne");
      const dataTransfer = {
         ...data,
         address: address,
      };
      console.log(dataTransfer, "dataTransfer");
      try {
         const formData = new FormData();

         if (avatar?.obj) {
            const avatarBlob = await dataAsyncUrlToFile(avatar.src);
            formData.append("image", avatarBlob);
         }
         const dataBlob = objectToBlob(dataTransfer);
         formData.append("data", dataBlob);
         const response = await api.put("/users/update-profile", formData, {
            headers: {
               "Content-type": "multipart/form-data",
            },
         });
         console.log(response.data, "response data");
         dispatch(userInfoSlice.actions.updateUserInfo(response.data));
         localStorage.setItem("userInfo", JSON.stringify(response.data));
         // You can handle the response here
      } catch (error) {
         console.error(error);
      }
   }

   const handleSaveChange = () => {
      setIsEditable(!isEditable);

      if (isEditable) {
         const updatedData = {
            ...formInfo,
         };
         updateProfile(updatedData);
         // dispatch(userInfoSlice.actions.updateUserInfo(formInfo));
      }
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
   if (formInfo === undefined) {
      console.log(formInfo);
      dispatch(globalConfigSlice.actions.changeBackDrops(true));
      return <Skeleton></Skeleton>;
   }
   dispatch(globalConfigSlice.actions.changeBackDrops(false));
   console.log(formInfo);
   return (
      <Fragment>
         <h1>Your Profile</h1>
         <div className={clsx(s.profile)}>
            <div className={clsx(s.uploadImg)}>
               <div className={clsx(s.imgProfile)}>
                  <img
                     src={
                        avatar?.src ||
                        info?.imgUrl ||
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
               <label
                  className={clsx(s.editProfile, isEditable ? "" : s.disabled)}
                  htmlFor="customFile"
               >
                  Choose Avatar
               </label>
            </div>

            <div className={clsx(s.showInfo)}>
               <Grid spacing={1} container className={clsx(s.info)}>
                  <Grid sm={4} md={4} xl={4} className={clsx(s.title)}>
                     <Tooltip
                        title={
                           <Typography
                              fontSize={"2rem"}
                              color={Style.color.$Accent1}
                           >
                              {formInfo?.fullName
                                 ? formInfo.fullName
                                 : "Provide your full name"}
                           </Typography>
                        }
                     >
                        <div className={clsx(s.inputText)}>
                           <TextField
                              id="filled-basic"
                              value={formInfo?.fullName}
                              variant="outlined"
                              color="Accent7"
                              label="Full Name"
                              sx={textFieldStyle}
                              disabled={!isEditable}
                              fullWidth
                              name="fullName"
                              onChange={(e) => handleUpdateProfile(e)}
                           />
                        </div>
                     </Tooltip>
                  </Grid>
                  <Grid sm={4} md={4} xl={4} className={clsx(s.title)}>
                     <Tooltip
                        title={
                           <Typography
                              fontSize={"2rem"}
                              color={Style.color.$Accent1}
                           >
                              {formInfo?.phoneNumber
                                 ? formInfo.phoneNumber
                                 : "Provide your phone number"}
                           </Typography>
                        }
                     >
                        <div className={clsx(s.inputText)}>
                           <TextField
                              id="filled-basic"
                              value={formInfo?.phoneNumber || ""}
                              variant="outlined"
                              color="Accent7"
                              label="Phone Number"
                              name="phoneNumber"
                              sx={textFieldStyle}
                              disabled={!isEditable}
                              fullWidth
                              onChange={(e) => handleUpdateProfile(e)}
                           />
                        </div>
                     </Tooltip>
                  </Grid>
                  <Grid sm={4} md={4} xl={4} className={clsx(s.title)}>
                     <Tooltip
                        title={
                           <Typography
                              fontSize={"2rem"}
                              color={Style.color.$Accent1}
                           >
                              {formInfo?.email
                                 ? formInfo.email
                                 : "Provide your email"}
                           </Typography>
                        }
                     >
                        <div className={clsx(s.inputText)}>
                           <TextField
                              id="filled-basic"
                              value={formInfo.email}
                              variant="outlined"
                              label="Email"
                              color="Accent7"
                              name="email"
                              sx={textFieldStyle}
                              disabled
                              fullWidth
                           />
                        </div>
                     </Tooltip>
                  </Grid>
               </Grid>
               <Tooltip
                  title={
                     <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                        {address}
                     </Typography>
                  }
               >
                  <Grid2 container sx={{ width: "80rem" }}>
                     <Grid2
                        xs={8}
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           border: "1px solid #6a6a6a",
                           borderTopLeftRadius: "5px",
                           borderBottomLeftRadius: "5px",
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
                     </Grid2>
                     <Grid2 xs={4} sx={{ display: "flex" }}>
                        <Button
                           disabled={!isEditable}
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
                     </Grid2>
                  </Grid2>
               </Tooltip>
               <div className={clsx(s.containerButton)}>
                  {isEditable ? (
                     <Button
                        type="button"
                        className={clsx(s.saveChange)}
                        onClick={() => setIsEditable(false)}
                     >
                        Cancel
                     </Button>
                  ) : (
                     ""
                  )}
                  <Button
                     type="button"
                     className={clsx(s.saveChange)}
                     onClick={handleSaveChange}
                  >
                     {isEditable ? "Save Change" : "Edit"}
                  </Button>
               </div>
            </div>
         </div>
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
                     onClick={() => setOpenModel(false)}
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
      </Fragment>
   );
};

export default Profile;
