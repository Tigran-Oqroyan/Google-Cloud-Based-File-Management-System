import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const deleteFile = createAsyncThunk(
  "fileDelete/deleteFile",
  async (fileIds, { rejectWithValue }) => {
    const url = "https://form.apiboomtech.com/api/deleteGoogleCloudFiles";
    const batchSize = 10;
    const batches = chunkArray(fileIds, batchSize);

    try {
      const promises = batches.map((batch) =>
        axios.delete(url, {
          data: { fileIds: batch },
          headers: {
            "Content-Type": "application/json",
          },
        })
      );

      const responses = await Promise.all(promises);

      const allFilesDeleted = responses.flatMap(
        (response) => response.data.filesDeleted
      );
      const allFilesFailed = responses.flatMap(
        (response) => response.data.filesFailed
      );

      return { filesDeleted: allFilesDeleted, filesFailed: allFilesFailed };
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
