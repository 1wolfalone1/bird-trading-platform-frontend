import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./global/userInfoSlice";


const store = configureStore({
   reducer: {
      userInfo: userInfoSlice.reducer,
   }
})
export default store;