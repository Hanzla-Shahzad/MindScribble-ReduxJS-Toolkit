import { createSlice } from "@reduxjs/toolkit";
import {
  commentsData,
  deleteCommentsData,
  addComment,
  editComment,
} from "../thunks/commentsAsyncThunk";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(commentsData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(commentsData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(commentsData.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(deleteCommentsData.fulfilled, (state, action) => {
      state.data = state.data.filter((val) => val.id !== action.payload.id);
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      // console.log(action.payload, JSON.stringify(state.data[0]));
      const newId = state.data.length + 1;
      // console.log(newId, action.payload);
      state.data.push({
        id: newId,
        body: action.payload.body,
        postId: action.payload.postId,
      });
    });
    builder.addCase(editComment.fulfilled, (state, action) => {
      const { id, body } = action.payload;

      const idx = state.data.findIndex((val) => val.id === id);
      state.data[idx].body = body;
    });
  },
});
export default commentsSlice.reducer;
