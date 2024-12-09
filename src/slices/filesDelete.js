import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteFiles = createAsyncThunk(
  "filesDelete/deleteFiles",
  async (_, { rejectWithValue }) => {
    const folder = "wix_uploads/1a2b3c4d5e-6f7g-8h9i-1a2b3-45678cd9e1fg";

    const url = "https://form.apiboomtech.com/api/deleteGoogleCloudFolder";

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folder }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete folder");
      }

      const data = await response.json();
      return data.filesDeleted; // Assuming the backend returns a list of deleted files
    } catch (error) {
      return rejectWithValue(error.message);
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
        state.error = action.payload;
      });
  },
});

export default filesDeleteSlice.reducer;
