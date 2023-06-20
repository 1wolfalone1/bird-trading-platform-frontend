import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userList } from "./message-username/userListData";
import { api } from "../../api/server/API";
import { DatasetLinked } from "@mui/icons-material";

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState:{
        message: {
            currentShopIDSelect: 0,
            numRead: 0,
            numberUnread: 0,
            userList:[],
            messageList: {
                messageListData: [],
                pageNumber: 1,
            }
        }
    },
    reducers: {
        setMessageList: (state, action) => {
            state.message.messageList = action.payload
        },
        addMessage: (state, action) => {
            state.message.messageList.messageListData.push(action.payload.message) 
        },
        setReadMessage: (state, action) => {
          var numberRead = 0;
            const updatedUserList = action.payload.userList.map(item => {
                if (item.id === action.payload.id) {
                  //get number unread
                  numberRead = item.unread;
                  return {
                    ...item,
                    unread: 0
                  };
                }
                return item;
              });
              console.log(updatedUserList);
            // state.message.userList = updatedUserList;
            const id =  action.payload.id;
            console.log(id)
            return {
              ...state,
              message: {
                ...state.message,
                userList: updatedUserList,
                numRead: numberRead,
                currentShopIDSelect: id
              },
              
            };
        },
        setNumberUnread: (state, action) => {
            console.log(action.payload.numberUnread)
            state.message.numberUnread = action.payload.numberUnread
        },
        increaseNumberUnread: (state, action) => {
          console.log('+1')
            return {
              ...state,
              message: {
                ...state.message,
                numberUnread: state.message.numberUnread + 1,
              },
            };
        }, 
        setCurrentShopIDSelect: (state, action) => {
          state.message.currentShopIDSelect = action.payload.shopID
        },
        updateMessagePopoverOpenUser: (state, action) => {
          const message = action.payload.message;
        
          // Update the unread message count for each user in userList
          if (state.message.messageList.messageListData?.length === 0) {
            const updatedUserList = action.payload.userList.map((item) => {
              if (item.id === message.shopID) {
                // Update the unread count
                const unread = item.unread + 1;
                return {
                  ...item,
                  unread: unread,
                };
              }
              return item;
            });
        
            return {
              ...state,
              message: {
                ...state.message,
                userList: updatedUserList,
              },
            };
          } else {
            // Handle the case when the message is clicked
            // ...
            //Handle message arrive is have the same shop id with shop id
            const currentShopID = action.payload.currentShopIDSelect;   
            if(currentShopID === message.shopID) {
              const updatedMessageListData = [...state.message.messageList.messageListData, message];

              const updatedUserList = action.payload.userList.map((item) => {
                if (item.id === currentShopID) {
                  // Update the unread count
                  return {
                    ...item,
                    unread: 1,
                  };
                }
                return item;
              });
          
              return {
                ...state,
                message: {
                  ...state.message,
                  messageList: {
                    ...state.message.messageList,
                    messageListData: updatedMessageListData,
                  },
                  userList: updatedUserList,
                },
              };

            }else {
              //Handle message arrive is not have the same shop id with shop id
              const updatedUserList = action.payload.userList.map((item) => {
                if (item.id === message.shopID) {
                  // Update the unread count
                  const unread = item.unread + 1;
                  return {
                    ...item,
                    unread: unread,
                  };
                }
                return item;
              });
          
              return {
                ...state,
                message: {
                  ...state.message,
                  userList: updatedUserList,
                },
              };
            }
          }
        }
            
    },
    extraReducers: (builder) =>
        builder
        .addCase(getListUser.fulfilled, (state, action) => {
            state.message.userList = action.payload
        })
        .addCase(getListUser.rejected, (state, action) => {
            console.log(action)
        })
        .addCase(getListMessage.fulfilled, (state, action) => {
            state.message.messageList.messageListData = action.payload.lists;
            state.message.messageList.pageNumber = action.payload.pageNumber;
        })
        .addCase(sendMessage.rejected, (state, action) => {
            console.log(action)
        }) 
})

export const { setMessage, addMessage } = messageSlice.actions;

export default messageSlice;

export const getListUser = createAsyncThunk(
    "message/channel-list",
    async (_, {getState}) => {
        const state = getState();
        const userInfo = state.userInfoSlice.info
        try {
        const res = await api.get(`/users/${userInfo?.id}/get-channel`);
          const data = res.data;
          return data;
        //   dispatch(getListUserSuccess(res.data));
        } catch (error) {
          console.log(error);
        }
      }
) ;

export const getListMessage = createAsyncThunk(
    "message/message-list",
    async (shopId, {getState}) => {
        const state = getState();
        const userInfo = state.userInfoSlice.info
        try {
          const res = await api.get(`/users/${userInfo?.id}/get-messages`, {params: {shopId: shopId}});
          const data = res.data;
          return data;
        //   dispatch(getListUserSuccess(res.data));
        } catch (error) {
          console.log(error);
        }
      }
) ;

export const sendMessage = createAsyncThunk(
  "message/message-send",
    async (message) => {
        try{
          const res = await api.post(`/users/message/send`, message);
          const data = res.data;
          return data;
        }catch (error) {
          console.log(error)
        }
    }
)

export const messageSelector = state => state.messageSlice.message
