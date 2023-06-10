import React, { Fragment, useState } from "react";
import clsx from "clsx";
import Style from "../../../style/inline-style/style";
import s from "./Delivery.module.scss";
import { TextField, Tooltip, Typography } from "@mui/material";

export default function Delivery() {
  const deliveryInfo = {
    customerName: "Huynh Van Phuot",
    phone: "0123456789",
    address: "Tan Phu Ward, Thu Duc City, HCM City",
  };
  const [isEditable, setIsEditable] = useState(false); // Editable state for the fields
  const [name, setName] = useState(deliveryInfo.customerName);
  const [phone, setPhone] = useState(deliveryInfo.phone);
  const [address, setAddress] = useState(deliveryInfo.address);

  const textFieldStyle = {
    input: {
      color: Style.color.$Complementary0,
      fontSize: "2.4rem",
      fontFamily: Style.font.$Primary,
      fullWidth: true,
      paddingTop: "0.6rem",
      paddingBottom: "0.6rem",
      textAlign: "center",
    },
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleSaveChange = () => {
    setIsEditable(!isEditable);
  };

  return (
    <Fragment>
      <div className={clsx(s.container)}>
        <div className={clsx(s.header)}>
          <div className={clsx(s.title)}>Delivery To</div>
          <div className={clsx(s.changeButton)}>
            <button
              type="button"
              className={clsx(s.changeInfo)}
              onClick={handleSaveChange}
            >
              {isEditable ? "Submit" : "Change"}
            </button>
          </div>
        </div>
        <div className={clsx(s.info)}>
          <div className={clsx(s.nameAndPhone)}>
            <div className={clsx(s.name)}>
              <TextField
                id="filled-basic"
                value={name}
                variant="filled"
                color="Dominant0"
                sx={textFieldStyle}
                disabled={!isEditable}
                fullWidth
                onChange={handleChangeName}
              />
            </div>
            <div className={clsx(s.phone)}>
              <TextField
                id="filled-basic"
                value={phone}
                variant="filled"
                color="Dominant0"
                sx={textFieldStyle}
                disabled={!isEditable}
                fullWidth
                onChange={handleChangePhone}
              />
            </div>
          </div>
          <Tooltip
            title={
              <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                {address}
              </Typography>
            }
          >
            <div className={clsx(s.address)}>
              <TextField
                id="filled-basic"
                value={address}
                variant="filled"
                color="Dominant0"
                sx={textFieldStyle}
                disabled={!isEditable}
                fullWidth
                onChange={handleChangeAddress}
              />
            </div>
          </Tooltip>
        </div>
      </div>
    </Fragment>
  );
}
