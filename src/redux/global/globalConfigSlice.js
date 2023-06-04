


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userStatus = {
   GUEST: 0,
   USER: 1,
   SHOP_OWER: 2,
   SHOP_STAFF: 3,
   ADMIN: 4,
}

const globalConfigSlice = createSlice({
   name: "productState",
   initialState: {
      toastStyle: {
         name: "",
         props: {
            theme: "dark"
         }
      },
   },
   reducers: {
      changeToastStyle: (state, action) => {
         state.toastStyle.name = action.payload;
      },
   },
});
export default globalConfigSlice;

export const toastStyleSelector = state => state.globalConfigSlice.toastStyle;


