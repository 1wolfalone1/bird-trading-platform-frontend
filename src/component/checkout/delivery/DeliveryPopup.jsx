import React, { useEffect, useState } from "react";
import s from "./deliveryPopup.module.scss";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../redux/global/userInfoSlice";
import Style from "../../../style/inline-style/style";
import clsx from "clsx";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, TextField, Tooltip, Typography } from "@mui/material";

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
  const [fullName, setFullName] = useState("");
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
    fontSize: "1.8rem",
    height: "6rem",
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
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
                <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
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
                  value={info.fullName}
                  onChange={handleFullNameChange}
                  sx={textFieldStyle}
                  fullWidth
                />
              </Grid>
            </Tooltip>
            <Tooltip
              title={
                <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
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
                  value={info.phoneNumber}
                  onChange={handleFullNameChange}
                  sx={textFieldStyle}
                  fullWidth
                />
              </Grid>
            </Tooltip>
          </Grid>
        </div>
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
                    <option key={ward.code} value={ward.code} name={ward.name}>
                      {ward.name}
                    </option>
                  ))}
              </select>
            </Grid>
          </Grid>
        </div>
        <Tooltip
          title={
            <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
              {`${info.address.street ? `${info.address.street} Street` : ""}`}
            </Typography>
          }
        >
          <div className={clsx(s.street)}>
            <TextField
              id="street"
              label="Street Name, Building, House No"
              variant="outlined"
              color="Dominant0"
              value=""
              onChange={handleFullNameChange}
              sx={textFieldStyle}
              fullWidth
            />
          </div>
        </Tooltip>
        <div className={clsx(s.submitBtn)}>
          <Button>Submit</Button>
        </div>
      </div>
    </>
  );
}
