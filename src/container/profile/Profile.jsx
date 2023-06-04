import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { TextField } from "@mui/material";
import s from "./profile.module.scss";
import Style from "../../style/inline-style/style";
import img from "../../asset/leftImagLogin.jpg";
import { faCity } from "@fortawesome/free-solid-svg-icons";

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
  const [fullName, setFullName] = useState("Huynh Van Phuot");
  const [email, setEmail] = useState("phuothvse160205@fpt.edu.vn");
  const [joinedOn, setJoinedOn] = useState("11/11/1111");
  const [phoneNumber, setPhoneNumber] = useState("0123456789");
  const [isEditable, setIsEditable] = useState(false); // Editable state for the fields
  const [city, setCity] = useState("HCM");
  const [district, setDistrict] = useState("Thu Duc");
  const [ward, setWard] = useState("Tan Phu");
  const [street, setStreet] = useState("313 Hoang Huu Nam");

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
  };

  const handleChangeFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };
  const handleChangeDistrict = (e) => {
    setDistrict(e.target.value);
  };
  const handleChangeWard = (e) => {
    setWard(e.target.value);
  };
  const handleChangeStreet = (e) => {
    setStreet(e.target.value);
  };
  return (
    <Fragment>
      <h1>Your Profile</h1>
      <div className={clsx(s.profile)}>
        <div className={clsx(s.uploadImg)}>
          <div className={clsx(s.imgProfile)}>
            <img src={avatar} alt="" />
          </div>

          <input
            type="file"
            name="avatar"
            id="customFile"
            hidden
            onChange={handleUpdateAvatar}
          />
          <label className={clsx(s.edit_profile)} htmlFor="customFile">
            Choose Avatar
          </label>
        </div>

        <div className={clsx(s.showInfo)}>
          <div className={clsx(s.left)}>
            <div className={clsx(s.title)}>
              <span>Name:</span>
              <div className={clsx(s.inputText)}>
                <TextField
                  id="filled-basic"
                  value={fullName}
                  variant="filled"
                  color="Dominant0"
                  sx={textFieldStyle}
                  disabled={!isEditable}
                  fullWidth
                  onChange={handleChangeFullName}
                />
              </div>
            </div>
            <div className={clsx(s.title)}>
              <span>Phone:</span>
              <div className={clsx(s.inputText)}>
                <TextField
                  id="filled-basic"
                  value={phoneNumber}
                  variant="filled"
                  color="Dominant0"
                  sx={textFieldStyle}
                  disabled={!isEditable}
                  fullWidth
                  onChange={handleChangePhoneNumber}
                />
              </div>
            </div>
            <div className={clsx(s.title)}>
              <span>Email:</span>
              <div className={clsx(s.inputText)}>
                <TextField
                  id="filled-basic"
                  value={email}
                  variant="filled"
                  color="Dominant0"
                  sx={textFieldStyle}
                  disabled
                  fullWidth
                />
              </div>
            </div>
            <div className={clsx(s.title)}>
              <span>Joined:</span>
              <div className={clsx(s.inputText)}>
                <TextField
                  id="filled-basic"
                  value={joinedOn}
                  variant="filled"
                  color="Dominant0"
                  sx={textFieldStyle}
                  disabled
                  fullWidth
                />
              </div>
            </div>
          </div>
          <div className={clsx(s.right)}>
            <div className={clsx(s.title)}>
              <span>City:</span>
              <div className={clsx(s.inputText)}>
                <TextField
                  id="filled-basic"
                  value={city}
                  variant="filled"
                  color="Dominant0"
                  sx={textFieldStyle}
                  disabled={!isEditable}
                  fullWidth
                  onChange={handleChangeCity}
                />
              </div>
            </div>
            <div className={clsx(s.title)}>
              <span>District:</span>
              <div className={clsx(s.inputText)}>
                <TextField
                  id="filled-basic"
                  value={district}
                  variant="filled"
                  color="Dominant0"
                  sx={textFieldStyle}
                  disabled={!isEditable}
                  fullWidth
                  onChange={handleChangeDistrict}
                />
              </div>
            </div>
            <div className={clsx(s.title)}>
              <span>Ward:</span>
              <div className={clsx(s.inputText)}>
                <TextField
                  id="filled-basic"
                  value={ward}
                  variant="filled"
                  color="Dominant0"
                  sx={textFieldStyle}
                  disabled={!isEditable}
                  fullWidth
                  onChange={handleChangeWard}
                />
              </div>
            </div>
            <div className={clsx(s.title)}>
              <span>Street:</span>
              <div className={clsx(s.inputText)}>
                <TextField
                  id="filled-basic"
                  value={street}
                  variant="filled"
                  color="Dominant0"
                  sx={textFieldStyle}
                  disabled={!isEditable}
                  fullWidth
                  onChange={handleChangeStreet}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(s.containerButton)}>
        <button
          type="button"
          className={clsx(s.saveChange)}
          onClick={handleSaveChange}
        >
          {isEditable ? "Save Change" : "Edit"}
        </button>
      </div>
    </Fragment>
  );
};

export default Profile;
