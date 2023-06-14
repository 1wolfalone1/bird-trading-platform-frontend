import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./global/userInfoSlice";
import HomeSlice from "../container/home/HomeSlice";
import productsPresentationSlice from "../component/products-presentation/productsPresentationSlice";
import cartSlice from "../container/order/cartSlice";
import globalConfigSlice from "./global/globalConfigSlice";

const store = configureStore({
  reducer: {
    userInfoSlice: userInfoSlice.reducer,
    homeData: HomeSlice.reducer,
    productsPresentationData: productsPresentationSlice.reducer,
    cartSlice: cartSlice.reducer,
    globalConfigSlice: globalConfigSlice.reducer,
  },
});
export default store;
