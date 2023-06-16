import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { Button, TextField, Tooltip, Typography } from "@mui/material";
import s from "./profile.module.scss";
import Style from "../../style/inline-style/style";
import img from "../../asset/leftImagLogin.jpg";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import userInfoSlice, {
  userInfoSelector,
} from "../../redux/global/userInfoSlice";

const textFieldStyle = {
  input: {
    color: Style.color.$Complementary0,
    fontSize: "2.4rem",
    fontFamily: Style.font.$Primary,
    fullWidth: true,
    paddingTop: "1.2rem",
    paddingBottom: "0.8rem",
  },
};

const Profile = () => {
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || img);
  const [isEditable, setIsEditable] = useState(false); // Editable state for the fields
  const dispatch = useDispatch();
  const { info } = useSelector(userInfoSelector);
  const [formInfo, setFormInfo] = useState(info);

  const handleUpdateAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        const newAvatar = reader.result;
        setAvatar(newAvatar);
        localStorage.setItem("avatar", newAvatar); // Save the avatar URL in Local Storage
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSaveChange = () => {
    setIsEditable(!isEditable);
    if (isEditable) {
      dispatch(userInfoSlice.actions.updateUserInfo(formInfo));
    }
  };

  useEffect(() => {}, []);

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
      case "city":
        setFormInfo((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            city: value,
          },
        }));
        break;
      case "district":
        setFormInfo((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            district: value,
          },
        }));
        break;
      case "ward":
        setFormInfo((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            ward: value,
          },
        }));
        break;
      case "street":
        setFormInfo((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            street: value,
          },
        }));
        break;
      default:
        break;
    }
  };

  console.log(formInfo);

  return (
    <Fragment>
      <h1>Your Profile</h1>
      <div className={clsx(s.profile)}>
        <div className={clsx(s.uploadImg)}>
          <div className={clsx(s.imgProfile)}>
            <img src={formInfo?.imgUrl} alt="" />
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
        </div>

        <div className={clsx(s.showInfo)}>
          <div className={clsx(s.left)}>
            <div className={clsx(s.title)}>
              <span>Name:</span>
              <Tooltip
                title={
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                    {formInfo?.fullName}
                  </Typography>
                }
              >
                <div className={clsx(s.inputText)}>
                  <TextField
                    id="filled-basic"
                    value={formInfo?.fullName}
                    variant="filled"
                    color="Dominant0"
                    sx={textFieldStyle}
                    disabled={!isEditable}
                    fullWidth
                    name="fullName"
                    onChange={(e) => handleUpdateProfile(e)}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={clsx(s.title)}>
              <span>Phone:</span>
              <Tooltip
                title={
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
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
                    variant="filled"
                    color="Dominant0"
                    name="phoneNumber"
                    sx={textFieldStyle}
                    disabled={!isEditable}
                    fullWidth
                    onChange={(e) => handleUpdateProfile(e)}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={clsx(s.title)}>
              <span>Email:</span>
              <Tooltip
                title={
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                    {formInfo.email}
                  </Typography>
                }
              >
                <div className={clsx(s.inputText)}>
                  <TextField
                    id="filled-basic"
                    value={formInfo.email}
                    variant="filled"
                    color="Dominant0"
                    name="email"
                    sx={textFieldStyle}
                    disabled
                    fullWidth
                  />
                </div>
              </Tooltip>
            </div>
            <div className={clsx(s.title)}>
              <span>Joined:</span>
              <Tooltip
                title={
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                    {formInfo.role}
                  </Typography>
                }
              >
                <div className={clsx(s.inputText)}>
                  <TextField
                    id="filled-basic"
                    value={formInfo.role}
                    variant="filled"
                    color="Dominant0"
                    sx={textFieldStyle}
                    disabled
                    fullWidth
                  />
                </div>
              </Tooltip>
            </div>
          </div>
          <div className={clsx(s.right)}>
            <div className={clsx(s.title)}>
              <span>City:</span>
              <Tooltip
                title={
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                    {formInfo.address?.city
                      ? formInfo.address.city
                      : "Provide your city"}
                  </Typography>
                }
              >
                <div className={clsx(s.inputText)}>
                  <TextField
                    id="filled-basic"
                    value={formInfo.address?.city || ""}
                    variant="filled"
                    color="Dominant0"
                    name="city"
                    sx={textFieldStyle}
                    disabled={!isEditable}
                    fullWidth
                    onChange={(e) => handleUpdateProfile(e)}
                    // onChange={handleChangeCity}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={clsx(s.title)}>
              <span>District:</span>
              <Tooltip
                title={
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                    {formInfo.address?.district
                      ? formInfo.address.district
                      : "Provide your district"}
                  </Typography>
                }
              >
                <div className={clsx(s.inputText)}>
                  <TextField
                    id="filled-basic"
                    value={formInfo.address?.district || ""}
                    variant="filled"
                    color="Dominant0"
                    name="district"
                    sx={textFieldStyle}
                    disabled={!isEditable}
                    fullWidth
                    onChange={(e) => handleUpdateProfile(e)}
                    // onChange={handleChangeDistrict}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={clsx(s.title)}>
              <span>Ward:</span>
              <Tooltip
                title={
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                    {formInfo.address?.ward
                      ? formInfo.address.ward
                      : "Provide your ward"}
                  </Typography>
                }
              >
                <div className={clsx(s.inputText)}>
                  <TextField
                    id="filled-basic"
                    value={formInfo.address?.ward || ""}
                    variant="filled"
                    color="Dominant0"
                    name="ward"
                    sx={textFieldStyle}
                    disabled={!isEditable}
                    fullWidth
                    onChange={(e) => handleUpdateProfile(e)}
                    // onChange={handleChangeWard}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={clsx(s.title)}>
              <span>Street:</span>
              <Tooltip
                title={
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                    {formInfo.address?.street
                      ? formInfo.address.street
                      : "Provide your street"}
                  </Typography>
                }
              >
                <div className={clsx(s.inputText)}>
                  <TextField
                    id="filled-basic"
                    value={formInfo.address?.street || ""}
                    variant="filled"
                    color="Dominant0"
                    name="street"
                    sx={textFieldStyle}
                    disabled={!isEditable}
                    fullWidth
                    onChange={(e) => handleUpdateProfile(e)}
                    // onChange={handleChangeStreet}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(s.containerButton)}>
        <Button
          type="button"
          className={clsx(s.saveChange)}
          onClick={handleSaveChange}
        >
          {isEditable ? "Save Change" : "Edit"}
        </Button>
      </div>
    </Fragment>
  );
};

export default Profile;
