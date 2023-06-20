import { Send } from '@mui/icons-material'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Input } from '@mui/material'
import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import s from './messageContent.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import messageSlice, { messageSelector, sendMessage } from '../messageSlice'
import { userInfoSelector } from '../../../redux/global/userInfoSlice'
import moment from 'moment';
import { Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

const SENDER_NAME = {
  USER: 'user',
  SHOP: 'shop'
}

const MESSAGE_SATUS = {
  SEND: 'send'
}

const MessageContent = () => {
  const containerRef = useRef(null);

  const divRef = useRef(null);

  const {messageList, currentShopIDSelect, userList} = useSelector(messageSelector)

  const {info} = useSelector(userInfoSelector)

  const currentDate = moment().format('YYYY-MM-DD');

  const dispatch  = useDispatch()

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect( () => {
    scrollToBottom();
  },[messageList.messageListData])

  //handle scroll
  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Handle the scroll event on the specific div
  //     console.log('User scrolled on the div');
  //   };

  //   const divElement = containerRef.current;

  //   // Add the scroll event listener to the div element
  //   divElement.addEventListener('scroll', handleScroll);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     divElement.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const scrollToBottom = () => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  //validation
  const handleSendMessage = (values, { resetForm }) => {
    const uni = moment().format('x');
    const updatedValues = {
      ...values,
      id: uni,
      date: moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ'),
      shopID: currentShopIDSelect,
    }; 
    resetForm();
    dispatch(messageSlice.actions.addMessage({  message: updatedValues }));
    // dispatch(sendMessage(updatedValues));
    dispatch(messageSlice.actions.setReadMessage({userList: userList, id: currentShopIDSelect})); 
    console.log("here is curren shop id select: ", currentShopIDSelect);
  };

  const validationSchema = Yup.object( {
    content: Yup.string()
        .min(1, "PLease enter message!")
        .max(1000, "Message is to long")
        .required("Need to be write some thing")
  });

  console.log(currentShopIDSelect, "day la shop is")
  return (
    <div className={clsx(s.container)}>
        <span className={clsx(s.shopName)}>Shop Name</span>
      
        <div className={clsx(s.messageContent)}>
            <ul className={clsx(s.messageList)} ref={containerRef}>
                <div className={clsx(s.messagecontainer)}>
                  {messageList.messageListData?.map(item => (
                  <li className={item.userID != info.id ? clsx(s.messageItem) : clsx(s.messageItemSelf)} key={item.id}>
                    <div className={clsx(s.messageData)}>                    
                      {item.content}
                      <span className={clsx(s.messageTime)}>
                        {moment(currentDate).isSameOrBefore(moment(item.date, 'YYYY-MM-DD'))
                          ? moment(item.date).format('LT') 
                          : moment(item.date).format('DD/MM/YYYY') 
                        }
                      </span>
                    </div>
                  </li>
                  ))}    
                </div>        
            </ul>
        </div>
        {/* <div > */}
        <Formik initialValues={{
          date: 0,
          senderName: SENDER_NAME.USER,
          shopID: currentShopIDSelect,
          userID: info.id,
          status: MESSAGE_SATUS.SEND,
          content: '',
          id: 0,
            }}
                // enableReinitialize = {true}
          validationSchema ={validationSchema}
          validateOnChange = {true}
          validateOnBlur = {true}
          onSubmit={handleSendMessage}
          >
                
          {
            ({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form className={clsx(s.wrapperInputSend)}>
                 <div className={clsx(s.inputBox)}>
                    <Input className={clsx(s.inputSend)} placeholder='Enter message here'
                      name='content'
                      type='text'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.content}
                      autoComplete="new-password"
                    />
                  </div>
                  <Button type='submit' disabled={currentShopIDSelect === 0} ><Send className={clsx(s.sendIcon)}></Send></Button>
              </Form>
             )}
        </Formik>
        {/* </div> */}
    </div>
  )
}

export default MessageContent
