import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

    },
    extraReducers: (builder) => {

    }
})

export default rateProductDetailSlice;

// export const getListReivewBaseOnProductId = createAsyncThunk(
//     "rate/review-list",
//     async(productId)
// )