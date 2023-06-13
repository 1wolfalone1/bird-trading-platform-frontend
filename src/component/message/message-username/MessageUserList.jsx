import { DialogContent, DialogContentText } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import s from './messageUserList.module.scss'
import { getListUser } from '../messageSlice'
import { useEffect } from 'react'
import { userList } from './userListData'

const MessageUserList = () => {

  // const [userList, setUserList] = useState([])

  const dispatch = useDispatch()

  useEffect( () => {
    // setUserList(us)
  }, [])
  const freshChannelChat = () => {
    getListUser()
  }

  return (
    <div  className={clsx(s.container)}>
      <DialogContent sx={{padding:  "0px", overflow: "hidden"}}>
          <DialogContentText className={clsx(s.messageTitle)}>
            <b>Select a shop:</b>
          </DialogContentText>
          <ul className={clsx(s.memberList)}>
            {userList.map((user) => (
              <li  key={user.id}>
                <div className={clsx(s.member)}>
                  <img src='https://yt3.ggpht.com/a/AATXAJyF9vTwfHwac_AXt5dBptXIs2kcMDu7tcnAPw=s900-c-k-c0xffffffff-no-rj-mo' className={clsx(s.avatarShop)}/>
                  <span className={clsx(s.shopName)}>{user.userName}</span>
                </div>
              </li>
            ))}
          </ul>
      </DialogContent>
    </div>
  )
}

export default MessageUserList
