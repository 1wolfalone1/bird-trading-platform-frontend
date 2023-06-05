import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { birdApi } from "../../api/server/products/BirdsAPI";
import { foodAPI } from "./../../api/server/products/FoodAPI";
import { productAPI } from "./../../api/server/products/ProductsAPI";
import { accessoriesAPI } from "./../../api/server/products/AccessoriesAPI";

export const homeDataStatus = {
   ERROR: -1,
   PENDING: 0,
   FULFILLED: 1,
};

export default createSlice({
   name: "homeData",
   initialState: {
      topProduct: {
         status: "",
         data: [],
      },
      bird: {
         status: "",
         data: [],
      },
      accessories: {
         status: "",
         data: [],
      },
      food: {
         status: "",
         data: [],
      },
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getBirds.fulfilled, (state, payload) => {
            state.bird.status = homeDataStatus.FULFILLED;
            state.bird.data = [...payload.payload];
         })
         .addCase(getFood.fulfilled, (state, payload) => {
            state.food.status = homeDataStatus.FULFILLED;
            state.food.data = [...payload.payload];
         })
         .addCase(getTopProducts.fulfilled, (state, payload) => {
            state.topProduct.status = homeDataStatus.FULFILLED;
            state.topProduct.data = [...payload.payload];
         })
         .addCase(getAccessories.fulfilled, (state, payload) => {
            state.accessories.status = homeDataStatus.FULFILLED;
            state.accessories.data = [...payload.payload];
         })
         .addCase(getBirds.pending, (state, payload) => {
            state.bird.status = homeDataStatus.PENDING;
         })
         .addCase(getFood.pending, (state, payload) => {
            state.food.status = homeDataStatus.PENDING;
         })
         .addCase(getTopProducts.pending, (state, payload) => {
            state.topProduct.status = homeDataStatus.PENDING;
         })
         .addCase(getAccessories.pending, (state, payload) => {
            state.accessories.status = homeDataStatus.PENDING;
         });
   },
});
const suffixTopProduct = '/top-product';
export const getBirds = createAsyncThunk("home/getBirds", async () => {
   const response = await birdApi.get(suffixTopProduct);
   console.log(response.data, "data nee");
   return response.data;
});
export const getFood = createAsyncThunk("home/getFood", async () => {
   const response = await foodAPI.get(suffixTopProduct);
   console.log(response.data, "data nee");
   return response.data;
});
export const getTopProducts = createAsyncThunk(
   "home/getTopProducts",
   async () => {
      const response = await productAPI.get("/top-product");
      console.log(response.data, "data nee");
      return response.data;
   }
);
export const getAccessories = createAsyncThunk(
   "home/getAccessories",
   async () => {
      const response = await accessoriesAPI.get(suffixTopProduct);
      console.log(response.data, "data nee");
      return response.data;
   }
);

export const getBirdsSelector = (state) => state.homeData.bird;
export const getFoodSelector = (state) => state.homeData.food;
export const getTopProductsSelector = (state) => state.homeData.topProduct;
export const getAccessoriesSelector = (state) => state.homeData.accessories;
