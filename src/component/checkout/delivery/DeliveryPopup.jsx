import $ from "jquery";
import React, { useEffect, useState } from "react";
import s from "./deliveryPopup.module.scss";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../redux/global/userInfoSlice";
import Style from "../../../style/inline-style/style";
import clsx from "clsx";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  getAPIProvince,
} from "../../../api/server/location/LocationAPI";

const textFieldStyle = {
  marginBottom: "2rem",
  input: {
    color: Style.color.$Complementary0,
    fontSize: "2rem",
    fontFamily: Style.font.$Primary,
  },
  label: {
    fontSize: "2rem",
  },
};

export default function DeliveryPopup({ close }) {
  const { info } = useSelector(userInfoSelector);
  const [fullName, setFullName] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handle = async () => {
    const e = await fetch("https://provinces.open-api.vn/api/p/");
    const data = await e.json();
    console.log(data);
  };

  handle();

  // const handleProvinceChange = (e) => {
  //   const selectedProvinceCode = e.target.value;
  //   setSelectedProvince(selectedProvinceCode);
  //   setSelectedDistrict("");
  //   setSelectedWard("");

  //   // Fetch districts based on the selected province code
  //   fetchDistricts(selectedProvinceCode);
  // };

  // const handleDistrictChange = (e) => {
  //   const selectedDistrictCode = e.target.value;
  //   setSelectedDistrict(selectedDistrictCode);
  //   setSelectedWard("");

  //   // Fetch wards based on the selected district code
  //   fetchWards(selectedDistrictCode);
  // };

  // const handleWardChange = (e) => {
  //   const selectedWardCode = e.target.value;
  //   setSelectedWard(selectedWardCode);
  //   setSelectedWard("");
  // };

  // const fetchDistricts = async (provinceCode) => {
  //   try {
  //     const response = await fetch(
  //       `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
  //     );
  //     const data = await response.json();
  //     setDistricts(data.districts);
  //   } catch (error) {
  //     console.error("Error fetching districts:", error);
  //   }
  // };

  // const fetchWards = async (districtCode) => {
  //   try {
  //     const response = await fetch(
  //       `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
  //     );
  //     const data = await response.json();
  //     setWards(data.wards);
  //   } catch (error) {
  //     console.error("Error fetching wards:", error);
  //   }
  // };

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
            <Grid sm={6} md={6} xl={6} className={clsx(s.name)}>
              <TextField
                id="fullName"
                variant="filled"
                color="Dominant0"
                onChange={handleFullNameChange}
                sx={textFieldStyle}
                fullWidth
              />
            </Grid>
            <Grid sm={6} md={6} xl={6} className={clsx(s.phone)}>
              <TextField
                id="phoneNumber"
                variant="filled"
                color="Dominant0"
                onChange={handleFullNameChange}
                sx={textFieldStyle}
                fullWidth
              />
            </Grid>
          </Grid>
        </div>
        <div className={clsx(s.address)}>
          <div>
            <select
              id="province"
              value={selectedProvince}
              // onChange={handleProvinceChange}
            >
              <option disabled value="">
                City
              </option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>

            <select
              id="district"
              value={selectedDistrict}
              // onChange={handleDistrictChange}
            >
              <option disabled value="">
                District
              </option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>

            <select
              id="ward"
              value={selectedWard}
              // onChange={handleWardChange}
            >
              <option disabled value="">
                Ward
              </option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>

            <div id="result">{`${selectedProvince}| ${selectedDistrict}| ${selectedWard}`}</div>
          </div>
        </div>
        <div className={clsx(s.address)}>
          <TextField
            id="address"
            label="Address"
            variant="filled"
            color="Dominant0"
            onChange={handleFullNameChange}
            sx={textFieldStyle}
            fullWidth
          />
        </div>
        <div className={clsx(s.street)}>
          <TextField
            id="street"
            label="Street Name, Building, House No"
            variant="filled"
            color="Dominant0"
            onChange={handleFullNameChange}
            sx={textFieldStyle}
            fullWidth
          />
        </div>
        <div className={clsx(s.submitBtn)}>
          <Button>Submit</Button>
        </div>
      </div>
    </>
  );
}
