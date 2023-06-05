
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userStatus = {
   GUEST: 0,
   USER: 1,
   SHOP_OWER: 2,
   SHOP_STAFF: 3,
   ADMIN: 4,
}
const userInfoSlice = createSlice({
   name: "productState",
   initialState: {
      status: userStatus.GUEST,
      info: {

      },
   },
   reducers: {
      changeAuthentication: (state, action) => {
         state.status = action.payload.status;
         state.info = action.payload.info;
      },
   },
});
export default userInfoSlice;

export const userInfoSelector = state => state.userInfoSlice;