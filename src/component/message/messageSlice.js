import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./message-username/userListData";

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState:{
        message: {}
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        },
        addMessage: (state, action) => {
            const { userName, message } = action.payload;
            state.payload.messages[userName] = message;
        }
    }
})

export const { setMessage, addMessage } = messageSlice.actions;

export default messageSlice;

export const getListUser = () => {
    JSON.stringify(userList)
    .then(repose => console.log(repose))
    .catch(error => console.log(error))
}
