import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const response = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const commentsData = createAsyncThunk("commentsData", async ({ id }) => {
  try {
    const res = await response.get(`posts/${id}/comments`);
    return res.data;
  } catch (error) {
    console.log("commentsData error =====>", error);
    throw error;
  }
});

export const addComment = createAsyncThunk(
  "addComment",
  async ({ postId, body }) => {
    try {
      const res = await response.post(`/comments`, { postId, body });
      return { ...res.data, postId, body };
    } catch (error) {
      console.log("addComment error =====>", error);
      throw error;
    }
  }
);

export const deleteCommentsData = createAsyncThunk(
  "DeleteCommentsData",
  async ({ id }) => {
    try {
      await response.delete(`comments/${id}`);
      return { id };
    } catch (error) {
      console.log("DeleteCommentsData error =====>", error);
      throw error;
    }
  }
);

export const editComment = createAsyncThunk(
  "editComment",
  async ({ id, postId, body }) => {
    try {
      const res = await response.put(`/comments/${id}`, { body });
      return { ...res.data, id, postId, body };
    } catch (error) {
      console.log("editComment========>error", error);
      throw error;
    }
  }
);
