import { Send } from '@mui/icons-material'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Input } from '@mui/material'
import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import s from './messageContent.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import messageSlice, { getListMessageOlder, messageSelector, sendMessage } from '../messageSlice'
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

  const {messageList, currentShopIDSelect, userList, unread} = useSelector(messageSelector)

  const {info} = useSelector(userInfoSelector)

  const currentDate = moment().format('YYYY-MM-DD');

  const dispatch  = useDispatch()

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect( () => {
    scrollToBottom();
  },[messageList.messageListData])


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
    dispatch(sendMessage(updatedValues));
    dispatch(messageSlice.actions.setReadMessage({userList: userList, id: currentShopIDSelect})); 
    const shop = {
      id: currentShopIDSelect
    }
    dispatch(messageSlice.actions.addShopIntoUserList({shop: shop}));
    console.log("here is curren shop id select: ", currentShopIDSelect);
  };

  const validationSchema = Yup.object( {
    content: Yup.string()
        .min(1, "PLease enter message!")
        .max(1000, "Message is to long")
        .required("Need to be write some thing")
  });

  const showMoreOlderMessage = async () => {
    dispatch(messageSlice.actions.changeCurretNumberMessagePaing({number: 1}));
    const data = await dispatch(getListMessageOlder(currentShopIDSelect));
    console.log(data, "data ne")
    dispatch(messageSlice.actions.updateListMessage({lists: data?.payload?.lists}))
  }

  return (
    <div className={clsx(s.container)}>
        <span className={clsx(s.shopName)}>
          {userList?.find(item => item.id === currentShopIDSelect)?.shopName || <>Shop name</>}
        </span>
      
        <div className={clsx(s.messageContent)}>
            <ul className={clsx(s.messageList)} ref={containerRef}>
                {messageList?.pageNumber > 1 &&
                  (messageList?.pageNumber - 1 !== messageList.currentPageNumber) &&
                    <Button sx={{textAlign: 'center',
                    width: '100%',
                    fontFamily: 'Segoe UI, Roboto, Oxygen',
                    color: 'Complementary0',
                    backgroundColor: 'Dominant1',
                    '&:hover': {
                      color: 'Dominant1', 
                      backgroundColor: 'Complementary0'
                    }
                    }}
                    onClick={showMoreOlderMessage}
                    >
                    View more
                    </Button>
                }
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
