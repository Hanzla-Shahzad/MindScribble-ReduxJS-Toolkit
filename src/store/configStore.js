import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../reduxSlice/postSlice"
import userReducer from "../reduxSlice/userSlice";
import todoReducer from "../reduxSlice/todoSlice";
import commentsReducer from "../reduxSlice/commentsSlice"

export const store = configureStore({
  reducer: {
    post: postReducer,
    users: userReducer,
    todo: todoReducer,
    comments: commentsReducer,
  }
})