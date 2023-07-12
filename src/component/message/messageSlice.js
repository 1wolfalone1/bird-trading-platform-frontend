import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { userList } from "./message-username/userListData";
import { api } from "../../api/server/API";
import { DatasetLinked } from "@mui/icons-material";

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState:{
        message: {
            isOpen: false,
            currentShopIDSelect: 0,
            numRead: 0,
            numberUnread: 0,
            userList:[],
            totalPage: 0,
            currentPage: 0,
            messageList: {
                messageListData: [],
                pageNumber: 0,
                currentPageNumber: 0,
            }
        }
    },
    reducers: {
        setOpenPopup: (state, action) => {
          state.message.isOpen = action.payload.isOpen;
        },
        setMessageList: (state, action) => {
            state.message.messageList = action.payload
        },
        addMessage: (state, action) => {
            state.message.messageList.messageListData.push(action.payload.message) 
        },
        setReadMessage: (state, action) => {
          console.log(
            'have read message'
          , action.payload.id)
          var numberRead = 0;
            const updatedUserList = action.payload.userList.map(item => {
                if (item.id === action.payload.id) {
                  //get number unread
                  numberRead = item.unread;
                  console.log('have jum in here number read', numberRead);
                  return {
                    ...item,
                    unread: 0
                  };
                }
                return item;
              });
              console.log(updatedUserList);
            // state.message.userList = updatedUserList;
            const newNumberUnread =  state.message.numberUnread - numberRead;
            const id = action.payload.id;
            return {
              ...state,
              message: {
                ...state.message,
                userList: updatedUserList,
                numRead: numberRead,
                currentShopIDSelect: id,
                numberUnread: newNumberUnread,
              },
              
            };
        },
        setNumberUnread: (state, action) => {
            console.log(action.payload.numberUnread)
            state.message.numberUnread = action.payload.numberUnread
        },
        increaseNumberUnread: (state, action) => {
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
        },
        addShopIntoUserList: (state, action) => {
          const { shop,  } = action.payload;
          
          const existShop = state.message.userList.find(item => item.id === shop.id);
          
          if (!existShop) {
            const updatedUserList = [shop, ...state.message.userList];
            return { ...state, message: { ...state.message, userList: updatedUserList } };
          }else {
            state.message.userList?.sort((a, b) => (a.id === shop.id ? -1 : 1));
          }
          
          return state;
        },
        changeCurrentShopListPaging: (state, action) => {
          const currentPageNumber = state.message.currentPage + action.payload.number;
          return {
            ...state,
            message: {
              ...state.message,
              currentPage: currentPageNumber,
            }
          }
        },
        updateListMessage: (state, action) => {
          const olderMessageList = action.payload.lists;
          const updateList = [...olderMessageList, ...state.message.messageList.messageListData];
          // const updateList = [];
          return {
            ...state,
            message: {
              ...state.message,
              messageList: {
                ...state.message.messageList,
                messageListData: updateList,
              }
            }
          }
      },
      changeCurretNumberMessagePaing: (state, action) => {
        const currentPageNumber = state.message.messageList.currentPageNumber + action.payload.number;
        return {
          ...state,
          message: {
            ...state.message,
            messageList: {
              ...state.message.messageList,
              currentPageNumber: currentPageNumber,
            }
          }
        }
      }
            
    },
    extraReducers: (builder) =>
        builder
        .addCase(getListUser.fulfilled, (state, action) => {
            state.message.userList = action.payload.lists;
            state.message.totalPage = action.payload.pageNumber;
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
        .addCase(getTotalUnread.fulfilled, (state, action) => {
            state.message.numberUnread = action.payload.totalUnread;
        })
        .addCase(getTotalUnread.rejected, (state,action) => {
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
        const pageNumber = state.messageSlice.message.currentPage;
        try {
        const res = await api.get(`/users/${userInfo?.id}/channels`, {params: {pagenumber: pageNumber}});
          const data = res.data;
          return data;
        //   dispatch(getListUserSuccess(res.data));
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
) ;

export const getListMessage = createAsyncThunk(
    "message/message-list",
    async (shopId, {getState}) => {
        const state = getState();
        const userInfo = state.userInfoSlice.info;
        const pageNumber = state.messageSlice.message.messageList
        try {
          const res = await api.get(`/users/${userInfo?.id}/messages`, {params: {shopid: shopId, pagenumber: pageNumber.currentPageNumber}});
          const data = res.data;
          return data;
        //   dispatch(getListUserSuccess(res.data));
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
) ;

export const getListMessageOlder = createAsyncThunk(
  "message/message-list-older",
  async (shopid, {getState}) => {
      const state = getState();
      const userInfo = state.userInfoSlice.info;
      const messageList = state.messageSlice.message.messageList
      try {
        const pageNumber = messageList?.currentPageNumber;
        const res = await api.get(`/users/${userInfo?.id}/messages`, {params: {shopid: shopid, pagenumber: pageNumber}});
        const data = res.data;
        return data;
      //   dispatch(getListUserSuccess(res.data));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
) ;

export const getTotalUnread = createAsyncThunk(
  "message/message-total-unread",
  async(_, {getState}) => {
    const state = getState();
    const userInfo = state.userInfoSlice.info
    try{
      const res = await api.get(`/users/${userInfo?.id}/messages/unread`);
      const data = res.data;
      return data;
    }catch(error){
      console.log(error);
      throw error;
    }
  }
)

export const sendMessage = createAsyncThunk(
  "message/message-send",
    async (message) => {
        try{
          const res = await api.post(`/users/message/send`, message);
          const data = res.data;
          return data;
        }catch (error) {
          console.log(error);
          throw error;
        }
    }
)

export const messageSelector = state => state.messageSlice.message
