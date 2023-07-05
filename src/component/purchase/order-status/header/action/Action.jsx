import clsx from "clsx";
import React from "react";
import s from "./action.module.scss";
import { Box, Button, Modal, Typography } from "@mui/material";
import ButtonChatNow from "../../../../message/button-chatnow/ButtonChatNow";
import Rate from "../../rate/Rate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const cssButton = {
  border: "1px solid #000000",
  padding: "1rem 2rem",
  fontSize: "2.4rem",
  textTransform: "none",
  color: "rgb(255, 255, 255)",
  backgroundColor: "rgb(94, 94, 94)",
  "&:hover": { color: "rgb(4, 0, 30)" },
};

export default function Action({ shopOwner, status, order }) {
  console.log(order);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRate = () => {
    if (status === "DELIVERIED") return true;
  };

  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.rate)}>
        <Button
          disabled={handleRate()}
          style={{ opacity: handleRate() ? 0.5 : 1 }}
          onClick={handleOpen}
        >
          Rate
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Rate order={order} close={handleClose} />
        </Modal>
      </div>
      <div className={clsx(s.chat)}>
        <ButtonChatNow
          ButtonOrIcon={Button}
          shop={shopOwner}
          css={cssButton}
          text={"Chat with Shop"}
        />
      </div>
    </div>
  );
}
