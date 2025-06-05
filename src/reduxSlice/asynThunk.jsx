import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const response = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  try {
    const res = await response.get("/todos");
    return res.data;
  } catch (error) {
    console.log("error====>", error);
  }
});

export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  try {
    await response.delete(`/todos/${id}`);
    return id;
  } catch (error) {
    console.log("apiDelete=====>error", error);
  }
});

export const addTodo = createAsyncThunk("addTodo", async (post) => {
  try {
    const res = await response.post(`/todos`, post);
    return res.data;
  } catch (error) {
    console.log("apiDelete=====>error", error);
  }
});

export const editTodo = createAsyncThunk("editTodo", async ({ id, post }) => {
  const res = await response.put(`/todos/${id}`, post);
  return res.data;
});
