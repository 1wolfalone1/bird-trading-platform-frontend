import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./global/userInfoSlice";
import HomeSlice from "../container/home/HomeSlice";


const store = configureStore({
   reducer: {
      userInfo: userInfoSlice.reducer,
      homeData: HomeSlice.reducer,
   }
})
export default store;