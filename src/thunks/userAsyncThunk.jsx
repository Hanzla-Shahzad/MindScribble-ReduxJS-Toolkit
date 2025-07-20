import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userData = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
});
