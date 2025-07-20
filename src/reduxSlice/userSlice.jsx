import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../thunks/userAsyncThunk";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(userData.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(userData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(userData.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
