import React from 'react';
import NavigationIcon from '@mui/icons-material/Navigation';
import MessageContent from './message-content/MessageContent';
import MessageUserList from './message-username/MessageUserList';
import { Box, Button, Dialog, Fab, Grid, Paper, Popover, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useState } from 'react';
import s from "./popupmessage.module.scss";
import clsx from 'clsx';
import { Cancel, Pages } from '@mui/icons-material';
import styled from '@emotion/styled';



const PopupMessage = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popup-message' : undefined;

  return (
    <div className={clsx(s.container)}>
      <Button 
              variant="contained"
              color="primary"
              onClick={handleClick}
              className={clsx(s.btnchat)}
              >
        Chat Now
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            overflow: "hidden"
          }
        }}
        className={clsx(s.popover)}
      >
      <div >
        <div className={clsx(s.warrperBtnClose)}>
          <Cancel  onClick={handleClose} className={clsx(s.btnClose)}/>
        </div>
        <Grid container className={clsx(s.messagecontent)}>
          <Grid item xs={4} sm={4} md={4} className={clsx(s.userList)} >
            <MessageUserList />
          </Grid>
          <Grid item xs={8} sm={8} md={8} className={clsx(s.messageChat)}  >
            <MessageContent />
          </Grid>
        </Grid>
      </div>
      </Popover>
    </div>
  );
};

export default PopupMessage;
