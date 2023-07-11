import {
  NotificationsNoneOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { Badge, Button, IconButton, Popover } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import s from "./notiItemsPopper.module.scss";
import clsx from "clsx";
import NotiItemInPoper from "./notiItemInpoper/NotiItemInPoper";
import { useDispatch, useSelector } from "react-redux";
import notificationSlice, {
  getListNotification,
  getUnreadNotification,
  notificationSelector,
} from "./notificationSlice";
import messageSlice from "../../message/messageSlice";
import { userInfoSelector } from "../../../redux/global/userInfoSlice";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useRef } from "react";

var stompClient = null;
const NotiItemsPopper = () => {
  // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { notiList, totalPageNumber, currentPageNumber, unread } =
    useSelector(notificationSelector);
  const { status, info } = useSelector(userInfoSelector);
  const [notification, setNotification] = useState();
  const useEffectRun = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnreadNotification());
    connect(status);
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    if(useEffectRun.current === true){
=======
    console.log(notification, "here is new notification");
    if (useEffectRun.current === true) {
>>>>>>> c8b4d7dda7a3b6f2b1be88e1e3db70c034d3f593
      handleNotificationArrive(notification);
    }
    return () => (useEffectRun.current = true);
  }, [notification]);

  const handleClose = () => {
    // setOpen(false);
    dispatch(
      notificationSlice.actions.setCurrentPageNumber({ currentPageNumber: 0 })
    );
    setAnchorEl(null);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(getListNotification(currentPageNumber));
    dispatch(notificationSlice.actions.setUnreadNoti({ unread: 0 }));
  };

  const handlViewMoreNoti = () => {
    if (currentPageNumber < totalPageNumber) {
      const newPage = currentPageNumber + 1;
      dispatch(
        notificationSlice.actions.setCurrentPageNumber({
          currentPageNumber: newPage,
        })
      );
      dispatch(getListNotification(newPage));
      // dispatch(getListNotification(newPage))
      console.log("hiiii");
    }
  };

  //socketjs
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
        `/notification/${info?.id}/user`,
        onPrivateNotification,
        onError
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onPrivateNotification = (payload) => {
    const notification = JSON.parse(payload.body);
    setNotification(notification);
  };

  const onError = (err) => {
    console.log(err);
  };
  //end socketjs

  const handleNotificationArrive = (notification) => {
    dispatch(
      notificationSlice.actions.increaseNotiUnreadToOne({ unread: unread })
    );
    handleNewNotification();
    if (open) {
      dispatch(
        notificationSlice.actions.addNotificationToList({
          notification: notification,
        })
      );
    }
  };

  //audio when have new message
  const handleNewNotification = () => {
    try {
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
    }
  };

  return (
    <div className={clsx(s.container)}>
      <IconButton
        aria-describedby="simple-popover"
        color="Dominant1"
        position="relative"
        onClick={handleOpen}
      >
        <Badge
          badgeContent={unread}
          color="Accent1"
          sx={{}}
          max={9}
          overlap="circular"
        >
          <NotificationsNoneOutlined className={clsx(s.notiIcon)} />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock={true}
        placement="bottom"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className={clsx(s.popoverNoti)}
      >
        <div className={clsx(s.notiContainer)}>
          {notiList?.length !== 0 ? (
            <ul className={clsx(s.notiList)}>
              <div className={clsx(s.titleNoti)}>
                <span>Notifications</span>
              </div>
              <div className={clsx(s.hrCustom)}></div>
              {notiList?.map((noti, index) => {
                return (
                  <NotiItemInPoper noti={noti} key={noti?.id} index={index} />
                );
              })}
            </ul>
          ) : (
            <img
              className={clsx(s.emtyNotiImage)}
              src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/emtynoti.png"
              alt=""
            />
          )}
        </div>
        <div className={clsx(s.btnViewMore)}>
          {totalPageNumber > 0 && totalPageNumber - 1 !== currentPageNumber && (
            <Button variant="outlsuned" fullWidth onClick={handlViewMoreNoti}>
              View older
            </Button>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default NotiItemsPopper;
