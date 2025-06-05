import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../reduxSlice/slice"

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  }
})