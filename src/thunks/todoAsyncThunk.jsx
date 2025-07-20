import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const response = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const todoData = createAsyncThunk("todoData", async ({ id }) => {
  try {
    const res = await response.get(`/users/${id}/todos`);
    return res.data;
  } catch (error) {
    console.log("todoData==========>error", error);
    throw error;
  }
});

export const todoDelete = createAsyncThunk("todoDelete", async ({ id }) => {
  try {
    await response.delete(`/todos/${id}`);
    return { id }; // return only the id
  } catch (error) {
    console.log("todoDelete=========>error", error);
    throw error;
  }
});
export const addTodos = createAsyncThunk("addTodos", async ({ title }) => {
  try {
    const res = await response.post(`/todos`, { title });
    return res.data;
  } catch (error) {
    console.log("addTodos=========>error", error);
    throw error;
  }
});

export const editTodos = createAsyncThunk(
  "editTodos",
  async ({ id, title }) => {
    try {
      const res = await response.put(`/todos/${id}`, { title });
      return { ...res.data, id, title };
    } catch (error) {
      console.log("editTodo========>error", error);
    }
  }
);
