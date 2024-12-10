import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteFiles = createAsyncThunk(
  "filesDelete/deleteFiles",
  async (_, { rejectWithValue }) => {
    const folder = "wix_uploads/1a2b3c4d5e-6f7g-8h9i-1a2b3-45678cd9e1fg";
    const url = "https://form.apiboomtech.com/api/deleteGoogleCloudFolder";

    try {
      const response = await axios.delete(url, {
        data: { folder },
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data.filesDeleted;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.error
          : error.message
      );
    }
  }
);

const filesDeleteSlice = createSlice({
  name: "filesDelete",
  initialState: {
    deletedFiles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedFiles = action.payload;
      })
      .addCase(deleteFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default filesDeleteSlice.reducer;
