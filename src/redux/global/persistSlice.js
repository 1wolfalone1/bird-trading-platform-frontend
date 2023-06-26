import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";



const persistSlice = createSlice({
   name: "persistSlice",
   initialState: {
      tempOrder: {}
   },
   reducers: {
      saveTempOrder: (state, action) => {
         state.tempOrder = action.payload;
      },
      clearTempOrder: (state, action) => {
         state.tempOrder = {};
      }
   },
});

export default persistSlice;


export const persistSliceSelector = state => state.persistSlice;
