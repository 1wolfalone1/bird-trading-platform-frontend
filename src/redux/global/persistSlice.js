import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";



const persistSlice = createSlice({
   name: "persistSlice",
   initialState: {
      tempOrder: {}
   },
   reducers: {
      saveTempOrder: (state, action) => {
         state.tempOrder = action.payload;
      }
   },
});

export default persistSlice;


export const persistSliceSelector = state => state.persistSlice;
