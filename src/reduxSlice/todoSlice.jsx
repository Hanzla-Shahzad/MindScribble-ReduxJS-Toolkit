import { createSlice } from "@reduxjs/toolkit";
import {
  addTodos,
  editTodos,
  todoData,
  todoDelete,
} from "../thunks/todoAsyncThunk";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
    isLoading: true,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(todoData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(todoData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(todoData.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(todoDelete.fulfilled, (state, action) => {
      state.data = state.data.filter((val) => val.id !== action.payload.id);
    });
    builder.addCase(editTodos.fulfilled, (state, action) => {
      const idx = state.data.findIndex((val) => val.id === action.payload.id);
      state.data[idx].title = action.payload.title;
    });
    builder.addCase(addTodos.fulfilled, (state, action) => {
      const id = state.data[state.data.length - 1].id + 1;
      state.data.push({
        id: id,
        title: action.payload.title,
      });
    });
  },
});
export default todoSlice.reducer;
