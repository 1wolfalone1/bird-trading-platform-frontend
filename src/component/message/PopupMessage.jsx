import React, { useEffect, useRef } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import MessageContent from "./message-content/MessageContent";
import MessageUserList from "./message-username/MessageUserList";
import {
  Badge,
  Box,
  Button,
  Dialog,
  Fab,
  Grid,
  Paper,
  Popover,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import s from "./popupmessage.module.scss";
import clsx from "clsx";
import { Cancel, Message, Pages } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/global/userInfoSlice";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import messageSlice, { getListMessageOlder, getListUser, getTotalUnread, messageSelector } from "./messageSlice";
import moment from "moment";

const StyledBadge = styled(Badge)(({ theme }) => ({
  right: 4,
  top: 13,
  border: `1px solid ${theme.palette.background.paper}`,
  padding: "0 2px",
  marginRight: "10px",
  "& .MuiBadge-badge": {
    fontSize: "1.5rem", // Adjust the size as needed
  },
}));

var stompClient = null;
const PopupMessage = () => {
  const dispatch = useDispatch();

  const { status, info } = useSelector(userInfoSelector);

  const [anchorEl, setAnchorEl] = useState(null);

  const { userList, numberUnread, numRead, currentShopIDSelect, isOpen } =
    useSelector(messageSelector);

  // const [anchorEl, setAnchorEl] = useState(isOpen);

  // const open = Boolean(anchorEl);

  const [open, setOpen] = useState(Boolean(anchorEl));

  const id = open ? "popup-message" : undefined;

  const [unread, setUnread] = useState(numberUnread);

  const [message, setMessage] = useState();

  const useEffectRun = useRef(false);

  useEffect( () => {
    connect(status); 
  }, [status]); 

  // useEffect(() => {
  //   // handleReadMessage();
  //   dispatch(getTotalUnread());
  // }, [numRead]);

  useEffect( () => {
    refreshUnread();
  },[info])

  useEffect(() => {
    console.log('co nhay')
      handleMessageArrive(message, open, currentShopIDSelect);
      dispatch(messageSlice.actions.increaseNumberUnread());
      handleNewMessage(" ");
  }, [message]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  //socket js
  const connect = (status) => {
    const url = process.env.REACT_APP_URL_WEBSOCKET;
    if (status === 1) {
      let Sock = new SockJS(`${url}`);
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => {
    try {
      stompClient.subscribe(
        `/chatroom/${info.id}/user`,
        onPrivateMessage,
        onError
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const onPrivateMessage = (payload) => {
    const message = JSON.parse(payload.body);
    setMessage(message);
  }
  // end socket

  const refreshUnread = async () => {
      if(info?.id != null) {
        const res = await dispatch(getTotalUnread());
        setUnread(res.payload?.totalUnread);
        console.log(res ,'nhin data ne')
      }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    dispatch(getListUser());
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    dispatch(messageSlice.actions.setOpenPopup({ isOpen: false }));
  };

  //This function use to handle message when user get an message
  const handleMessageArrive = (message, open, currentShopIDSelect) => {
    const updateMessage = {
      ...message,
      date: moment(message?.date).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
    };
    if (open) {
      // also need update the out side
      setUnread(numberUnread);
      // update unread in user list
      dispatch(
        messageSlice.actions.updateMessagePopoverOpenUser({
          userList: userList,
          message: updateMessage,
          currentShopIDSelect: currentShopIDSelect,
        })
      );
      const shop = {
        id: message.shopID
      };
      dispatch(messageSlice.actions.addShopIntoUserList({shop: shop}));
    } else {
      setUnread(numberUnread);
    }
  };


  //audio when have new message
  const handleNewMessage = (message) => {
    try {
      console.log(message);
      const audio = new Audio(
        "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/sound-effects/message_arrive_sound_effect.mp3"
      );
      // Play the notification sound
      // audioRef.current.play();
      var resp = audio.play();
      if (resp !== undefined) {
        resp
          .then((_) => {
            audio.play();
            // autoplay starts!
            // Stop the audio playback after 1 second
            setTimeout(() => {
              // audioRef.current.pause();
              // audioRef.current.currentTime = 0;
              audio.pause();
              audio.currentTime = 0;
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      // Handle the message
      // ...
    } catch (error) {
      // Handle the error
      console.log(error);
      throw error;
    }
  };

  return (
    <>
      {status == 1 && (
        <div className={clsx(s.container)}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            className={clsx(s.btnchat)}
          >
            Your Chat
            {numberUnread !== 0 && (
              <div className={clsx(s.numUnread)}>({numberUnread})</div>
            )}
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            disableScrollLock={true}
            PaperProps={{
              style: {
                overflow: "hidden",
              },
            }}
            className={clsx(s.popover)}
          >
            <div>
              <div className={clsx(s.warrperBtnClose)}>
                <Cancel onClick={handleClose} className={clsx(s.btnClose)} />
              </div>
              <Grid container className={clsx(s.messagecontent)}>
                <Grid item xs={4} sm={4} md={4} className={clsx(s.userList)}>
                  <MessageUserList />
                </Grid>
                <Grid item xs={8} sm={8} md={8} className={clsx(s.messageChat)}>
                  <MessageContent />
                </Grid>
              </Grid>
            </div>
          </Popover>
        </div>
      )}
    </>
  );
};

export default PopupMessage;