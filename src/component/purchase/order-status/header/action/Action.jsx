import { Button, Modal } from "@mui/material";
import clsx from "clsx";
import React from "react";
import ButtonChatNow from "../../../../message/button-chatnow/ButtonChatNow";
import Rate from "../../rate/Rate";
import s from "./action.module.scss";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRate = () => {
    if (status == "DELIVERED") return false;
    // return true;
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
          BackdropProps={{
            style: { pointerEvents: "none" },
          }}
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
