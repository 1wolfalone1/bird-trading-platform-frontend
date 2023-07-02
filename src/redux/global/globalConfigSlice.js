


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
         name: "default",
         props: {
            theme: "dark"
         }
      },
      navigateValue: 1,
      tempDataOrder: {
      },
      isBackdrop: false,
   },
   reducers: {
      changeToastStyle: (state, action) => {
         state.toastStyle.name = action.payload;
      },
      changeNavigateValue: (state, action) => {
         state.navigateValue = action.payload;
      },
      saveTempDataOrder: (state, action) => {
         state.tempDataOrder = action.payload;
      },
      changeBackDrops: (state, action) => {
         state.isBackdrop = action.payload;
      },
   },
});

export default globalConfigSlice;

export const toastStyleSelector = state => state.globalConfigSlice.toastStyle;


export const navigateValueSelector = state => state.globalConfigSlice.navigateValue;

export const globalConfigSliceSelector = state => state.globalConfigSlice;

export const backDropSelector = state => state.globalConfigSlice.isBackdrop;