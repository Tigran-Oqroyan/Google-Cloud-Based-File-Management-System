import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getFiles = createAsyncThunk(
  "filesGet/getFiles",
  async (_, { rejectWithValue }) => {
    const folder = "wix_uploads/1a2b3c4d5e-6f7g-8h9i-1a2b3-45678cd9e1fg";
    const url = `https://form.apiboomtech.com/api/getFilesFromGoogleCloud?folder=${encodeURIComponent(
      folder
    )}`;

    try {
      const response = await axios.get(url);
      return response.data.files;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.error
          : error.message
      );
    }
  }
);

const filesGetSlice = createSlice({
  name: "filesGet",
  initialState: {
    files: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearFiles: (state) => {
      state.files = [];
    },
    deleteFileById: (state, action) => {
      const id = action.payload;
      state.files = state.files.filter((file) => file.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(getFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { clearFiles, deleteFileById } = filesGetSlice.actions;
export default filesGetSlice.reducer;
