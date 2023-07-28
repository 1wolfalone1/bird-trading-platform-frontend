import { Button } from "@mui/material";
import clsx from "clsx";
import React, { Fragment } from "react";
import Popup from "reactjs-popup";
import DeliveryPopup from "./DeliveryPopup";
import s from "./delivery.module.scss";

export default function Delivery({ deliveryInfo, setDeliveryInfo }) {
  return (
    <Fragment>
      <div className={clsx(s.container)}>
        <div className={clsx(s.header)}>
          <div className={clsx(s.title)}>Delivery To</div>

          <div className={clsx(s.changeButton)}>
            <Popup
              className="addButton"
              modal
              trigger={<Button>Change</Button>}
              closeOnDocumentClick={false}
            >
              {(close) => (
                <DeliveryPopup
                  close={close}
                  deliveryInfo={deliveryInfo}
                  setDeliveryInfo={setDeliveryInfo}
                />
              )}
            </Popup>
          </div>
        </div>
        <div className={clsx(s.info)}>
          <div className={clsx(s.nameAndPhone)}>
            {deliveryInfo?.fullName && (
              <div className={clsx(s.name)}>{deliveryInfo.fullName}</div>
            )}
            {!deliveryInfo?.fullName && (
              <div className={clsx(s.errorName)}>Provide your name!</div>
            )}
            {deliveryInfo?.phoneNumber && (
              <div className={clsx(s.phone)}>{deliveryInfo.phoneNumber}</div>
            )}
            {!deliveryInfo?.phoneNumber && (
              <div className={clsx(s.errorPhone)}>Provide your number!</div>
            )}
          </div>
          {deliveryInfo?.address && (
            <div className={clsx(s.address)}>{deliveryInfo?.address}</div>
          )}
          {!deliveryInfo?.address && (
            <div className={clsx(s.errorAddress)}>Provide your address!</div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
