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
import axios from "axios";
import { api } from "../../api/server/API";
import Grid from "@mui/material/Unstable_Grid2";

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
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || img);
  const [isEditable, setIsEditable] = useState(false); // Editable state for the fields
  const dispatch = useDispatch();
  const { info } = useSelector(userInfoSelector);
  const [formInfo, setFormInfo] = useState(info);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [location, setLocation] = useState({
    province: null,
    district: null,
    ward: null,
  });

  const selectOption = {
    backgroundColor: "rgb(255, 235, 235)",
    fontSize: "2rem",
    height: "6rem",
  };

  useEffect(() => {
    loadProvinces();
  }, []);

  useEffect(() => {
    if (location.province) {
      loadDistricts(location.province.code);
    }
  }, [location.province]);

  useEffect(() => {
    if (location.district) {
      loadWards(location.district.code);
    }
  }, [location.district]);

  const handleProvinceChange = async (e) => {
    setLocation((prev) => ({
      ...prev,
      province: provinces?.find((item) => item.code == e.target.value),
    }));
  };

  const handleDistrictChange = async (e) => {
    setLocation((prev) => ({
      ...prev,
      district: districts?.find((item) => item.code == e.target.value),
    }));
  };

  const handleWardChange = (e) => {
    setLocation((prev) => ({
      ...prev,
      ward: wards?.find((item) => item.code == e.target.value),
    }));

    console.log(location);
  };

  const loadProvinces = async () => {
    const response = await fetch(`${LOCATION_API_URL}/p`);
    if (response.ok) {
      setProvinces(await response.json());
    }
  };

  const loadDistricts = async (pCode) => {
    const response = await fetch(`${LOCATION_API_URL}/d`);
    if (response.ok) {
      let data = await response.json();
      let districts = data.filter((d) => d?.province_code == pCode);
      setDistricts(districts);
    }
  };

  const loadWards = async (dCode) => {
    const response = await fetch(`${LOCATION_API_URL}/w`);
    if (response.ok) {
      let data = await response.json();
      let wards = data.filter((w) => w?.district_code == dCode);
      setWards(wards);
    }
  };

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

  const data = {
    email: formInfo.email,
    fullName: formInfo.fullName,
    phoneNumber: formInfo.phoneNumber,
    street: formInfo.address.street,
    ward: formInfo.address.ward,
    district: formInfo.address.district,
    city: formInfo.address.city,
  };

  async function updateProfile(data) {
    try {
      const response = await api.put("/users/update-profile", data);
      console.log(response.data); // You can handle the response here
    } catch (error) {
      console.error(error);
    }
  }
  console.log("data", data);

  const handleSaveChange = () => {
    setIsEditable(!isEditable);

    if (isEditable) {
      dispatch(userInfoSlice.actions.updateUserInfo(formInfo));
      updateProfile(data);
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
          <Grid container className={clsx(s.left)}>
            <Grid sm={4} md={4} xl={4} className={clsx(s.title)}>
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
                    variant="outlined"
                    color="Dominant0"
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
                    variant="outlined"
                    color="Dominant0"
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
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                    {formInfo.email}
                  </Typography>
                }
              >
                <div className={clsx(s.inputText)}>
                  <TextField
                    id="filled-basic"
                    value={formInfo.email}
                    variant="outlined"
                    label="Email"
                    color="Dominant0"
                    name="email"
                    sx={textFieldStyle}
                    disabled
                    fullWidth
                  />
                </div>
              </Tooltip>
            </Grid>
          </Grid>
          <div className={clsx(s.right)}>
            <div className={clsx(s.addressContainer)}>
              <Grid container spacing={1} className={clsx(s.address)}>
                <Grid sm={4} md={4} xl={4} className={clsx(s.gridItem)}>
                  <select
                    id="province"
                    className={clsx(s.province)}
                    value={location?.province?.code}
                    onChange={handleProvinceChange}
                    style={selectOption}
                  >
                    <option value="">City</option>
                    {provinces &&
                      provinces.map((province) => (
                        <option
                          key={province.code}
                          value={province.code}
                          name={province.name}
                        >
                          {province.name}
                        </option>
                      ))}
                  </select>
                </Grid>
                <Grid sm={4} md={4} xl={4} className={clsx(s.gridItem)}>
                  <select
                    id="district"
                    className={clsx(s.district)}
                    value={location?.district?.code}
                    onChange={handleDistrictChange}
                    style={selectOption}
                  >
                    <option value="">District</option>
                    {districts &&
                      districts.map((district) => (
                        <option
                          key={district.code}
                          value={district.code}
                          name={district.name}
                        >
                          {district.name}
                        </option>
                      ))}
                  </select>
                </Grid>
                <Grid sm={4} md={4} xl={4} className={clsx(s.gridItem)}>
                  <select
                    id="ward"
                    className={clsx(s.ward)}
                    value={location?.ward?.code}
                    onChange={handleWardChange}
                    style={selectOption}
                  >
                    <option value="">Ward</option>
                    {wards &&
                      wards.map((ward) => (
                        <option
                          key={ward.code}
                          value={ward.code}
                          name={ward.name}
                        >
                          {ward.name}
                        </option>
                      ))}
                  </select>
                </Grid>
              </Grid>
              <Tooltip
                title={
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                    {`${
                      info.address.street ? `${info.address.street} Street` : ""
                    }`}
                  </Typography>
                }
              >
                <div className={clsx(s.street)}>
                  <TextField
                    id="street"
                    variant="outlined"
                    name="street"
                    label="Street Name, Building, House No"
                    color="Dominant0"
                    value={formInfo.address?.street || ""}
                    onChange={(e) => handleUpdateProfile(e)}
                    sx={textFieldStyle}
                    fullWidth
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
