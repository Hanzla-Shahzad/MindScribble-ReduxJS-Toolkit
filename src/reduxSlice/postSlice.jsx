import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTodos,
  deleteTodo,
  addTodo,
  editTodo,
} from "../thunks/postAsynThunk";

const todoSlice = createSlice({
  name: "post",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    userDatas: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      // console.log("Error", action.payload);
      state.isError = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.data = state.data.filter((val) => val.id !== action.payload);
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      const todo = {
        id: state.data[state.data.length - 1].id + 1,
        title: action.payload.title,
      };
      state.data.push(todo);
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      let idx = state.data.findIndex((val) => val.id === action.payload.id);
      state.data[idx].title = action.payload.title;
    });
  },
});
export default todoSlice.reducer;
