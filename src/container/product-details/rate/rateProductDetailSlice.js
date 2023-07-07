import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { api } from "../../../api/server/API";

export const rateProductDetailSlice = createSlice({
    name: 'rateProductDetailSlice',
    initialState: {
        rate: {
            totalPageNumber: 0,
            currentPageNumber: 1,
            rateData: [],
        }
    },
    reducers: {
        changeCurrentPagereivew: (state, action) => {
            state.rate.currentPageNumber = action.payload;
        }
    },
    extraReducers: (builder) => 
        builder
        .addCase(getListReivewBaseOnProductId.fulfilled, (state, action) => {
            state.rate.rateData = action.payload.lists;
            state.rate.totalPageNumber = action.payload.pageNumber;
            console.log(' co vao day', current(state))
        })
        .addCase(getListReivewBaseOnProductId.rejected, (state, action) => {
            console.log(action);
        })
})

export default rateProductDetailSlice;

export const getListReivewBaseOnProductId = createAsyncThunk(
    "rate/review-list",
    async(productId, {getState}) => {
        const state = getState();
        const pageNumber = state.rateProductDetailSlice.rate.currentPageNumber;
        try {
            const res = await api.get(`/users/reviews/products/${productId}`, {params: {pageNumber: pageNumber }});
            const data = res.data;
            return data
        }catch(error) {
            throw error;
        }
    }
);

export const rateProductDetailSliceSelector = state => state.rateProductDetailSlice.rate;