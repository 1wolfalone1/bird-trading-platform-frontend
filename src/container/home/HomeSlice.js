import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { birdApi } from "../../api/mock/BirdsAPI";
export default createSlice({
   name: "homeData",
   initialState: {
      status: "pending",
      data: {
         topProduct: [],
         bird: [],
         accessories: [],
         food: [],
      },
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getBirds.fulfilled, (state, payload) => {
         state.status = 'fulfilled';
         state.data.bird = [...payload.payload];
      })
      .addCase(getBirds.pending, (state, payload) => {
         state.status = 'pending';
      });
   },
});

export const getBirds = createAsyncThunk("birds/getBirds", async () => {
   const response = await birdApi.get('/');
   console.log(response.data, 'data nee')
   return response.data;
});

export const getBirdsSelector = state => state.homeData.data.bird;