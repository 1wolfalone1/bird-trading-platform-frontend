import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userStatus = {
   GUEST: 0,
   USER: 1,
   SHOP_OWER: 2,
   SHOP_STAFF: 3,
   ADMIN: 4,
};
const cartSlice = createSlice({
   name: "productState",
   initialState: {
      items: [],
      vouchers: [],
      total: 0,
   },
   reducers: {
      addToCart: (state, action) => {
         let count = 0;
         state.items.map((item) => {
            if (item.id === action.payload.id) {
               count = count + 1;
               item.quantity = item.quantity + action.payload.quantity;
               return item;
            } else {
               return item;
            }
         });
         if (count === 0) state.items.push(action.payload);
      },
      removeItem: (state, action) => {
         state.items = state.items.filter(
            (item) => item.id !== action.payload.id
         );
      },
      changeQuantity: (state, action) => {
         state.items.map((item) => {
            if (item.id === action.payload.id) {
               return action.payload;
            } else {
               return item;
            }
         });
      },
      invokeCart: (state, action) => {
         return action.payload;        
      },
   },
});

export default cartSlice;


export const totalItemsSelector = state => state.cartSlice?.items.length;

export const getCartSelector = state => state.cartSlice;

export const getListItemSelector = state => state.cartSlice.items