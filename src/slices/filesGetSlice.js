import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFiles = createAsyncThunk(
  "filesGet/getFiles",
  async (_, { rejectWithValue }) => {
    const folder = "wix_uploads/1a2b3c4d5e-6f7g-8h9i-1a2b3-45678cd9e1fg";
    const url = `https://form.apiboomtech.com/api/getFilesFromGoogleCloud?folder=${encodeURIComponent(
      folder
    )}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
      return data.files;
    } catch (error) {
      return rejectWithValue(error.message);
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
  reducers: {},
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
        state.error = action.payload;
      });
  },
});

export default filesGetSlice.reducer;
