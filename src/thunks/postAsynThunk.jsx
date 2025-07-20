import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const response = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchTodos = createAsyncThunk("fetchTodos", async ({ id }) => {
  try {
    const res = await response.get(`/users/${id}/posts`);
    return res.data;
  } catch (error) {
    console.log("error====>", error);
  }
});

export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  try {
    await response.delete(`/posts/${id}`);
    return id;
  } catch (error) {
    console.log("apiDelete=====>error", error);
  }
});

export const addTodo = createAsyncThunk("addTodo", async (post, { id }) => {
  console.log("id--->", id);
  try {
    const res = await response.post(`/posts`, post);
    return { ...res.data, id };
  } catch (error) {
    console.log("apiDelete=====>error", error);
  }
});

export const editTodo = createAsyncThunk("editTodo", async ({ id, post }) => {
  const res = await response.put(`/posts/${id}`, post);
  return res.data;
});
