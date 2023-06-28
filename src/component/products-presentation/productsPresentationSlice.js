import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { birdApi } from "../../api/server/products/BirdsAPI";
import { api } from "../../api/server/API";
import globalConfigSlice from "../../redux/global/globalConfigSlice";

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
      ListTypeId: [],
      star: 0,
      sortPrice: "",
      name: "",
      highestPrice: 0.0,
      lowestPrice: 0.0,
      pageNumber: 1,
      category: 1,
    },
    products: {
      page: 1,
      data: [],
    },
    listTypeOfProduct: [],
  },
  reducers: {
    firstPageCall: (state, action) => {
      state.status = action.payload.status;
      state.info = action.payload.info;
    },
    chagePageState: (state, action) => {
      state.typeProduct = action.payload;
    },
    addToSelectedList: (state, action) => {
      console.log(action.payload.valueTemp);
      state.filter.ListTypeId = action.payload.valueTemp;
    },
    resetListTypeProduct: (state, action) => {
      state.filter.ListTypeId = [];
    },
    setStar: (state, action) => {
      console.log(action.payload.star);
      state.filter.star = action.payload.star;
    },
    setSortDirection: (state, action) => {
      state.filter.sortPrice = action.payload.direction;
      console.log(state.filter.sortPrice);
    },
    setHighestPrice: (state, action) => {
      state.filter.highestPrice = action.payload.highestPrice;
    },
    setLowestPrice: (state, action) => {
      state.filter.lowestPrice = action.payload.lowestPrice;
    },
    setPageNumber: (state, action) => {
      state.filter.pageNumber = action.payload.pageNumber;
    },
    setAllPriceToNull: (state, action) => {
      state.filter.sortPrice = "";
      state.filter.highestPrice = 0.0;
      state.filter.lowestPrice = 0.0;
    },
    setName: (state, action) => {
      state.filter.name = action.payload.name;
    },
    setCategory: (state, action) => {
      state.filter.category = action.payload.category;
    },
    setPageNumber: (state, action) => {
      state.filter.pageNumber = action.payload?.pageNumber;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(callFirstPage.fulfilled, (state, action) => {
        state.products.data = action.payload?.lists;
        state.products.page = action.payload?.pageNumber;
      })
      .addCase(slidePage.fulfilled, (state, action) => {
        state.products.data = action.payload?.lists;
        state.products.page = action.payload?.pageNumber;
      })
      .addCase(slidePage.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(changeTypeProduct.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(changeTypeProduct.fulfilled, (state, action) => {
        state.products.data = action.payload?.lists;
        state.products.page = action.payload?.pageNumber;
      })
      .addCase(getTypeOfProduct.fulfilled, (state, action) => {
        state.listTypeOfProduct = action.payload;
        console.log(action.payload);
      })
      .addCase(getTypeOfProduct.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(filterByAll.fulfilled, (state, action) => {
        console.log(state);
        state.products.data = action.payload?.lists;
        state.products.page = action.payload?.pageNumber;
        console.log(action.payload);
      })
      .addCase(filterByAll.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});
export default productsPresentationSlices;

export const callFirstPage = createAsyncThunk(
  "products/first-page",
  async (_, { getState, dispatch }) => {
    dispatch(globalConfigSlice.actions.changeBackDrops(true));
    try {
      const res = await birdApi.get("/pages/1");
      const data = await res.data;
      dispatch(globalConfigSlice.actions.changeBackDrops(false));
      return data;
    } catch (error) {
      dispatch(globalConfigSlice.actions.changeBackDrops(false));
    }
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

export const getTypeOfProduct = createAsyncThunk(
  "products/get-type-product",
  async (_, { getState }) => {
    const state = getState();
    console.log(state.productsPresentationData.typeProduct);
    try {
      if (state.productsPresentationData.typeProduct == typeProduct.BIRDS) {
        const res = await api.get("/types/birds");
        const data = await res.data;
        console.log(res.data);
        return data;
      }
      if (state.productsPresentationData.typeProduct == typeProduct.FOODS) {
        const res = await api.get("/types/foods");
        const data = await res.data;
        console.log(res.data);
        return data;
      }
      if (
        state.productsPresentationData.typeProduct == typeProduct.ACCESSORIES
      ) {
        const res = await api.get("/types/accessories");
        const data = await res.data;
        console.log(res.data);
        return data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const filterByAll = createAsyncThunk(
  "products/get-product-by-filter",
  async (_, { getState, dispatch }) => {
    const state = getState();
    dispatch(globalConfigSlice.actions.changeBackDrops(true));
    try {
      const res = await api.get("products/filter", {
        params: state.productsPresentationData.filter,
      });
      const data = await res.data;
      dispatch(
        productsPresentationSlices.actions.setStar({ key: "", star: 0 })
      );
      dispatch(globalConfigSlice.actions.changeBackDrops(false));
      return data;
    } catch (error) {
      dispatch(globalConfigSlice.actions.changeBackDrops(false));
      console.log(error);
      throw error;
    }
  }
);

export const pageSelector = (state) =>
  state.productsPresentationData.products.page;

export const productTypeSelector = (state) =>
  state.productsPresentationData.listTypeOfProduct;

export const categorySelector = (state) =>
  state.productsPresentationData.typeProduct;

export const filterObjectSelector = (state) =>
  state.productsPresentationData.filter;
