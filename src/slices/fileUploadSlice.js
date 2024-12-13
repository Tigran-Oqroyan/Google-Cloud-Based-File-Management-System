import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getFiles } from "./filesGetSlice";

export const uploadFiles = createAsyncThunk(
  "fileUpload/uploadFiles",
  async (files, { dispatch, rejectWithValue }) => {
    const folder = "wix_uploads/1a2b3c4d5e-6f7g-8h9i-1a2b3-45678cd9e1fg";

    // Prepare an array of file upload promises
    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      const url = `https://form.apiboomtech.com/api/uploadToGoogleCloud?folder=${encodeURIComponent(
        folder
      )}&fileName=${encodeURIComponent(file.name)}`;

      return axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => ({
          fileMetadata: { name: file.name, size: file.size, type: file.type },
          data: response.data,
        }))
        .catch((error) => ({
          fileMetadata: { name: file.name, size: file.size, type: file.type },
          error:
            error.response && error.response.data
              ? error.response.data.error
              : error.message,
        }));
    });

    try {
      // Wait for all upload promises to complete
      const results = await Promise.all(uploadPromises);

      // Dispatch to update the files state after all uploads finish
      dispatch(getFiles());

      return results; // Return the results of all uploads
    } catch (error) {
      return rejectWithValue(error);
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
    clearUploadedFiles: (state) => {
      state.files = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.files.forEach((file) => {
          file.status = "pending";
        });
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        // Process the response for each file after all uploads are completed
        action.payload.forEach((fileData) => {
          const fileIndex = state.files.findIndex(
            (f) => f.fileMetadata.name === fileData.fileMetadata.name
          );
          if (fileIndex !== -1) {
            state.files[fileIndex].status = "succeeded";
            state.files[fileIndex].data = fileData.data;
          }
        });
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        // Handle errors for files that failed to upload
        action.payload.forEach((fileData) => {
          const fileIndex = state.files.findIndex(
            (f) => f.fileMetadata.name === fileData.fileMetadata.name
          );
          if (fileIndex !== -1) {
            state.files[fileIndex].status = "failed";
            state.files[fileIndex].error = fileData.error;
          }
        });
      });
  },
});

export const { addFiles, clearUploadedFiles } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
