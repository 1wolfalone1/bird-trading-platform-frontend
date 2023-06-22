import { Badge, DialogContent, DialogContentText } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './messageUserList.module.scss'
import messageSlice, { getListMessage, getListUser, messageSelector} from '../messageSlice'
import { useEffect } from 'react'
import { Message, ModeComment, Visibility } from '@mui/icons-material'
import styled from '@emotion/styled'
import axios from 'axios'


const StyledBadge = styled(Badge)(({ theme }) => ({
  right: 0,
  top: 0,
  border: `1px solid ${theme.palette.background.paper}`,
  padding: '0 2px',
  marginRight: '10px',
  '& .MuiBadge-badge': {
    fontSize: '1.5rem', // Adjust the size as needed
  },
}));

const MessageUserList = () => {

  // const [userList, setUserList] = useState([])

  const dispatch = useDispatch()

  const {userList, messageList} = useSelector(messageSelector)

  const [activeBgColor, setActiveBgColor] = useState('');

  const getMessage =  async (id) => {
      dispatch(getListMessage(id))
      dispatch(messageSlice.actions.setReadMessage({userList: userList , id: id})); 
      console.log(id)
      setActiveBgColor(id)
  }
  console.log('here is an userList', userList)
  return (
    <div  className={clsx(s.container)}>
      <DialogContent sx={{padding:  "0px", overflow: "hidden"}}>
          <DialogContentText className={clsx(s.messageTitle)}>
            <b>Select a shop:</b>
          </DialogContentText>
          <ul className={clsx(s.memberList)}>
            {userList?.map((item) => (
              <li  key={item.id} className={clsx(s.memberItem, {[s.activeMemberUser]: item.id === activeBgColor})} onClick={() => getMessage(item.id)} >
                <div className={clsx(s.member)}>
                  <img src={item.imgUrl} className={clsx(s.avatarShop)}/>
                  <span className={clsx(s.shopName)}>{item.shopName}</span>
                </div>
                {
                  <StyledBadge color="primary" badgeContent={item.unread} className={clsx(s.unread)} sx={item.unread === 0 ? {visibility: 'hidden'} : null}>
                    <Message className={clsx(s.unreadIcon)}/>
                  </StyledBadge>
                }
              </li>
            ))}
          </ul>
      </DialogContent>
    </div>
  )
}

export default MessageUserList
