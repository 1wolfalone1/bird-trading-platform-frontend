import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/server/API";

export const userStatus = {
   GUEST: 0,
   USER: 1,
   SHOP_OWER: 2,
   SHOP_STAFF: 3,
   ADMIN: 4,
};
const userInfoSlice = createSlice({
   name: "productState",
   initialState: {
      status: userStatus.GUEST,
      info: {},
   },
   reducers: {
      changeAuthentication: (state, action) => {
         state.status = action.payload.status;
         state.info = action.payload.info;
      },
      invokeUserInfo: (state, action) => action.payload,
      updateUserInfo: (state, action) => {
         state.info = action.payload;
      },
   },
   extraReducers: (builder) =>
      builder
         .addCase(logout.fulfilled, (state, action) => {
            return { status: userStatus.GUEST, info: {} };
         })
         .addCase(invokeUserInfo.fulfilled, (state, action) => {
            return {
               status: 1,
               info: action.payload?.userInfo,
            };
         })
         .addCase(invokeUserInfo.rejected, (state, action) => {}),
});

export default userInfoSlice;
export const invokeUserInfo = createAsyncThunk(
   "userInfo/invokeUserInfo",
   async (oldUserInfo) => {
      try {
         console.log(oldUserInfo);
         const token = JSON.parse(localStorage.getItem("token"));
         const res = await api.get(`/info?token=${token.accessToken}`);
         const data = await res.data;
         console.log(data, "dataaaaaaaaaaaa");
         return data;
      } catch (err) {
         console.log(err);
      }
   }
);

export const logout = createAsyncThunk("userInfo/logout", async () => {
   const data = 0;
   localStorage.removeItem("userInfo");
   return data;
});

export const userInfoSelector = (state) => state.userInfoSlice;
export const userInfoDetailsSelector = (state) => state.userInfoSlice.info;
