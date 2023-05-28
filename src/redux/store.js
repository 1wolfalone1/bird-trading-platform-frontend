import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./global/userInfoSlice";
import HomeSlice from "../container/home/HomeSlice";
import productsPresentationSlice from "../component/products-presentation/productsPresentationSlice";


const store = configureStore({
   reducer: {
      userInfo: userInfoSlice.reducer,
      homeData: HomeSlice.reducer,
      productsPresentationData: productsPresentationSlice.reducer
   }
})
export default store;