import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getFiles } from "./filesGetSlice";

export const uploadFile = createAsyncThunk(
  "fileUpload/uploadFile",
  async (file, { dispatch, rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);

    const folder = "wix_uploads/1a2b3c4d5e-6f7g-8h9i-1a2b3-45678cd9e1fg";
    const url = `https://form.apiboomtech.com/api/uploadToGoogleCloud?folder=${encodeURIComponent(
      folder
    )}&fileName=${encodeURIComponent(file.name)}`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
      
      dispatch(getFiles())
        
      return {
        fileMetadata: { name: file.name, size: file.size, type: file.type },
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue({
        fileMetadata: { name: file.name, size: file.size, type: file.type },
        error:
          error.response && error.response.data
            ? error.response.data.error
            : error.message,
      });
    }
  }
);

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    files: [],
  },
  reducers: {
    addFiles: (state, action) => {
      action.payload.forEach((file) => {
        state.files.unshift({
          fileMetadata: { name: file.name, size: file.size, type: file.type },
          status: "pending",
          error: null,
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state, action) => {
        const fileIndex = state.files.findIndex(
          (f) => f.fileMetadata.name === action.meta.arg.name
        );
        if (fileIndex !== -1) state.files[fileIndex].status = "pending";
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        const fileIndex = state.files.findIndex(
          (f) => f.fileMetadata.name === action.payload.fileMetadata.name
        );
        if (fileIndex !== -1) {
          state.files[fileIndex].status = "succeeded";
          state.files[fileIndex].data = action.payload.data;
        }
      })
      .addCase(uploadFile.rejected, (state, action) => {
        const fileIndex = state.files.findIndex(
          (f) => f.fileMetadata.name === action.payload.fileMetadata.name
        );
        if (fileIndex !== -1) {
          state.files[fileIndex].status = "failed";
          state.files[fileIndex].error = action.payload.error;
        }
      });
  },
});

export const { addFiles } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
