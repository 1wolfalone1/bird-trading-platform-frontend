import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { birdApi } from "../../api/server/products/BirdsAPI";

export const ALL_SHOP = 0;
export const DECREASE = 1;
export const INCREASE = 2;
export const STATUS_FULLFILLED = 1;
export const STATUS_PENDING = 0;
export const STATUS_ERROR = -1;
export default createSlice({
  name: "productsPage",
  initialState: {
    status: STATUS_PENDING,
    shop: ALL_SHOP,
    filter: {
      type: [],
      rating: 0,
      price: {
        sort: INCREASE,
        range: {
          from: 0,
          to: Number.MAX_VALUE,
        },
      },
    },
    products: {
      page: 1,
      data: [],
    },
  },
  reducers: {
    firstPageCall: (state, action) => {
      state.status = action.payload.status;
      state.info = action.payload.info;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(callFirstPage.fulfilled, (state, action) => {
      state.products.data = action.payload;
    });
  },
});

export const callFirstPage = createAsyncThunk(
  "products/first-page",
  async () => {
    const res = await birdApi.get("/pages/0");
    const data = await res.data;
    return data;
  }
);
