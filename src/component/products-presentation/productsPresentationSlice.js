import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { birdApi } from "../../api/server/products/BirdsAPI";
import { api } from "../../api/server/API";

export const ALL_SHOP = 0;
export const DECREASE = 1;
export const INCREASE = 2;
export const STATUS_FULLFILLED = 1;
export const STATUS_PENDING = 0;
export const STATUS_ERROR = -1;

export const typeProduct = {
  PRODUCTS: "products",
  BIRDS: "birds",
  FOODS: "foods",
  ACCESSORIES: "accessories",
};

const productsPresentationSlices = createSlice({
  name: "productsPage",
  initialState: {
    status: STATUS_PENDING,
    typeProduct: typeProduct.BIRDS,
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
    chagePageState: (state, action) => {
      state.typeProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(callFirstPage.fulfilled, (state, action) => {
        state.products.data = action.payload.lists;
        state.products.page = action.payload.pageNumber;
      })
      .addCase(slidePage.fulfilled, (state, action) => {
        state.products.data = action.payload.lists;
        state.products.page = action.payload.pageNumber;
      })
      .addCase(slidePage.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(changeTypeProduct.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(changeTypeProduct.fulfilled, (state, action) => {
        state.products.data = action.payload.lists;
        state.products.page = action.payload.pageNumber;
      });
  },
});
export default productsPresentationSlices;
export const callFirstPage = createAsyncThunk(
  "products/first-page",
  async () => {
    const res = await birdApi.get("/pages/1");
    const data = await res.data;
    return data;
  }
);

export const slidePage = createAsyncThunk(
  "products/slide-page",
  async (page, { getState }) => {
    const state = getState();

    const res = await api.get(
      `/${state.productsPresentationData.typeProduct}/pages/${page}`
    );

    const data = await res.data;
    return data;
  }
);

export const changeTypeProduct = createAsyncThunk(
  "products/change-type",
  async (type, thunkAPI) => {
    thunkAPI.dispatch(productsPresentationSlices.actions.chagePageState(type));
    const res = await api.get(`/${type}/pages/1`);
    const data = await res.data;
    return data;
  }
);

export const pageSelector = (state) =>
  state.productsPresentationData.products.page;
