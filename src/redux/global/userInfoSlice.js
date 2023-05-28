
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export default createSlice({
   name: "productState",
   initialState: {
      status: "guest",
      info: {

      },
   },
   reducers: {
      changeAuthentication: (state, action) => {
         state.status = action.payload.status;
         state.info = action.payload.info;
      },
   },
});