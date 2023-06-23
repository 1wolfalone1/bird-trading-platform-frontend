


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const orderSlice = createSlice({
   name: "orderSlice",
   initialState: {
      itemsByShop: [],
      paymentMethod: '',
      total: {
         subTotal: 0,
         shippingTotal: 0,
         promotionFee: 0,
         allTotal: 0
      }
   },
   reducers: {
      updateItemsByShop: (state, action) => {
         state.itemsByShop.push(action.payload);
      }
   },
});

export default orderSlice



export const orderSliceSelector = state => state.orderSlice;