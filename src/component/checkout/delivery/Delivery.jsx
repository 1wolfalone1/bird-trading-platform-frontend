import React, { Fragment } from "react";
import clsx from "clsx";
import Style from "../../../style/inline-style/style";
import s from "./delivery.module.scss";
import { Button, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import DeliveryPopup from "./DeliveryPopup";

export default function Delivery({ userInfo }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className={clsx(s.container)}>
        <div className={clsx(s.header)}>
          <div className={clsx(s.title)}>Delivery To</div>

          <div className={clsx(s.changeButton)}>
            <Popup
              className="addButton"
              modal
              trigger={<Button>Change information</Button>}
            >
              {(close) => <DeliveryPopup close={close} />}
            </Popup>
          </div>

          {/* <div className={clsx(s.changeButton)}>
            <Button onClick={() => navigate("/profile")}>
              Change information
            </Button>
          </div> */}
        </div>
        <div className={clsx(s.info)}>
          <div className={clsx(s.nameAndPhone)}>
            {userInfo?.fullName && (
              <div className={clsx(s.name)}>{userInfo.fullName}</div>
            )}
            {!userInfo?.fullName && (
              <div className={clsx(s.errorName)}>Provide your name!</div>
            )}

            {userInfo?.phoneNumber && (
              <div className={clsx(s.phone)}>{userInfo.phoneNumber}</div>
            )}
            {!userInfo?.phoneNumber && (
              <div className={clsx(s.errorPhone)}>Provide your number!</div>
            )}
          </div>
          {userInfo?.address?.street &&
            userInfo?.address?.ward &&
            userInfo?.address?.district &&
            userInfo?.address?.city && (
              <Tooltip
                title={
                  <Typography fontSize={"2rem"} color={Style.color.$Accent1}>
                    {`${userInfo?.address.street} Street, ${userInfo?.address.ward} Ward, ${userInfo?.address.district} District, ${userInfo?.address.city} City`}
                  </Typography>
                }
              >
                <div className={clsx(s.address)}>
                  {`${userInfo?.address.street} Street, ${userInfo?.address.ward} Ward, ${userInfo?.address.district} District, ${userInfo?.address.city} City`}
                </div>
              </Tooltip>
            )}
          {(!userInfo?.address?.street ||
            !userInfo?.address?.ward ||
            !userInfo?.address?.district ||
            !userInfo?.address?.city) && (
            <div className={clsx(s.errorAddress)}>
              Provide full your address!
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
