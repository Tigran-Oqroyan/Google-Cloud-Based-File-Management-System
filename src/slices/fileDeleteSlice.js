import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteFile = createAsyncThunk(
  "fileDelete/deleteFile",
  async (fileIds, { rejectWithValue }) => {
    const url = "https://form.apiboomtech.com/api/deleteGoogleCloudFiles";

    try {
      const response = await axios.delete(url, {
        data: { fileIds },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.error
          : error.message
      );
    }
  }
);

const fileDeleteSlice = createSlice({
  name: "fileDelete",
  initialState: {
    deletedFiles: [],
    failedFiles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedFiles = action.payload.filesDeleted;
        state.failedFiles = action.payload.filesFailed;
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default fileDeleteSlice.reducer;
