import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
   },
   extraReducers: (builder) =>
      builder.addCase(logout.fulfilled, (state, action) => {
         return { status: userStatus.GUEST, info: {} };
      }),
});

export default userInfoSlice;

export const logout = createAsyncThunk("userInfo/logout", async () => {
   // const res = await birdApi.get("/pages/1");
   // const data = await res.data;
   const data = 0;
   localStorage.removeItem("userInfo");
   return data;
});

export const userInfoSelector = (state) => state.userInfoSlice;
