import { NotificationsNoneOutlined, NotificationsOutlined } from '@mui/icons-material'
import { Badge, IconButton, Popover } from '@mui/material'
import React from 'react'
import s from './notiItemsPopper.module.scss'
import clsx from 'clsx'
const NotiItemsPopper = () => {
  return (
    <div className={clsx(s.container)}>
        <IconButton
            aria-describedby='simple-popover'
            color="Dominant1"
            position="relative"
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

        <Popover>

        </Popover>
    </div>
  )
}

export default NotiItemsPopper
