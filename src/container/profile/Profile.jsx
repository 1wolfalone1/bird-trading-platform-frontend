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
import { dataAsyncUrlToFile, objectToBlob } from "../../utils/myUtils";

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
  const { info } = useSelector(userInfoSelector);
  const [formInfo, setFormInfo] = useState({
    ...info,
    address: {
      city: {
        name: info.address?.city,
      },
      district: {
        name: info.address?.district,
      },
      ward: {
        name: info.address?.ward,
      },
    },
  });

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const selectOption = {
    backgroundColor: "rgb(228, 223, 209)",
    fontSize: "2rem",
    height: "7rem",
  };

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    if (formInfo.address?.city) {
      loadDistricts(formInfo.address?.city.code);
      setWards([]);
    }
  }, [formInfo.address?.city]);

  useEffect(() => {
    if (formInfo.address?.district) {
      loadWards(formInfo.address?.district.code);
    }
  }, [formInfo.address?.district]);

  const handleCityChange = async (e) => {
    setFormInfo((prev) => ({
      ...prev,
      address: {
        city: cities?.find((item) => item.code == e.target.value),
      },
    }));
  };

  const handleDistrictChange = async (e) => {
    setFormInfo((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        district: districts?.find((item) => item.code == e.target.value),
        ward: null,
      },
    }));
  };

  const handleWardChange = (e) => {
    setFormInfo((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        ward: wards?.find((item) => item.code == e.target.value),
      },
    }));
  };

  const loadCities = async () => {
    const response = await fetch(`${LOCATION_API_URL}/p`);
    if (response.ok) {
      setCities(await response.json());
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
    try {
      const formData = new FormData();

      if (avatar?.obj) {
        const avatarBlob = await dataAsyncUrlToFile(avatar.src);
        formData.append("image", avatarBlob);
      }
      const dataBlob = objectToBlob(data);
      formData.append("data", dataBlob);
      const response = await api.put("/users/update-profile", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log(response.data);
      // You can handle the response here
    } catch (error) {
      console.error(error);
    }
  }

  const handleSaveChange = () => {
    setIsEditable(!isEditable);

    if (isEditable) {
      const { city, district, ward, street } = formInfo.address;
      const updatedData = {
        ...formInfo,
        address: {
          city: city?.name,
          district: district?.name,
          ward: ward?.name,
          street: street,
        },
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
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
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
                    {formInfo?.email ? formInfo.email : "Provide your email"}
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
          <div className={clsx(s.addressInfo)}>
            <div className={clsx(s.addressContainer)}>
              <Grid container spacing={1} className={clsx(s.address)}>
                <Grid sm={4} md={4} xl={4} className={clsx(s.gridItem)}>
                  <select
                    id="city"
                    className={clsx(s.city)}
                    value={formInfo.address?.city?.code}
                    onChange={handleCityChange}
                    disabled={!isEditable}
                    style={selectOption}
                    required
                  >
                    <option value="">{formInfo.address?.city?.name}</option>
                    {cities &&
                      cities.map((city) => (
                        <option
                          key={city.code}
                          value={city.code}
                          name={city.name}
                        >
                          {city.name}
                        </option>
                      ))}
                  </select>
                </Grid>
                <Grid sm={4} md={4} xl={4} className={clsx(s.gridItem)}>
                  <select
                    id="district"
                    className={clsx(s.district)}
                    value={formInfo.address?.district?.code}
                    disabled={!isEditable}
                    onChange={handleDistrictChange}
                    style={selectOption}
                    required
                  >
                    <option value="">{formInfo.address?.district?.name}</option>
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
                    value={formInfo.address?.ward?.code}
                    disabled={!isEditable}
                    onChange={handleWardChange}
                    style={selectOption}
                    required
                  >
                    <option value="">{formInfo.address?.ward?.name}</option>
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
            </div>
          </div>
          <Tooltip
            title={
              <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                {`${
                  formInfo.address?.street
                    ? `${formInfo.address?.street} Street`
                    : ""
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
                disabled={!isEditable}
                value={formInfo.address?.street || ""}
                onChange={(e) => handleUpdateProfile(e)}
                sx={textFieldStyle}
                fullWidth
              />
            </div>
          </Tooltip>
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
