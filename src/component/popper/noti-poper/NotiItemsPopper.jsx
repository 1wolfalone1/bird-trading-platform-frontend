import { NotificationsNoneOutlined, NotificationsOutlined } from '@mui/icons-material'
import { Badge, IconButton } from '@mui/material'
import React from 'react'
import s from './notiItemsPopper.module.scss'
import clsx from 'clsx'
const NotiItemsPopper = () => {
  return (
    <div className={clsx(s.container)}>
        <IconButton
            color="Dominant1"
            position="relative"
        >
            <Badge
            badgeContent={1}
            color="Accent1"
            sx={{}}
            max={10}
            overlap="circular"
            >
            </Badge>
            <NotificationsNoneOutlined className={clsx(s.notiIcon)}/>
        </IconButton>
    </div>
  )
}

export default NotiItemsPopper
