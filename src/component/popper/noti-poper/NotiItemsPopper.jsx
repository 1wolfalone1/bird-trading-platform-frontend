import { NotificationsNoneOutlined, NotificationsOutlined } from '@mui/icons-material'
import { Badge, IconButton, Popover } from '@mui/material'
import React, { useState } from 'react'
import s from './notiItemsPopper.module.scss'
import clsx from 'clsx'
import NotiItemInPoper from './notiItemInpoper/NotiItemInPoper'

const NotiItemsPopper = () => {
  // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    // setOpen(false);
    setAnchorEl(null);
  }

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }


  return (
    <div className={clsx(s.container)}>
        <IconButton
            aria-describedby='simple-popover'
            color="Dominant1"
            position="relative"
            onClick={handleOpen}
        >
            <Badge
            badgeContent={1}
            color="Accent1"
            sx={{}}
            max={9}
            overlap="circular"
            >
                <NotificationsNoneOutlined className={clsx(s.notiIcon)}/>
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
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          className={clsx(s.popoverNoti)}
          >
            <div className={clsx(s.notiContainer)}>
                <ul className={clsx(s.notiList)}>
                  <NotiItemInPoper />
                </ul>
            </div>
        </Popover>
    </div>
  )
}

export default NotiItemsPopper
