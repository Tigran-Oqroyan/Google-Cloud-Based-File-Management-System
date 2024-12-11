import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const selectedFilesSlice = createSlice({
  name: "selectedFiles",
  initialState,
  reducers: {
    selectFile: (state, action) => {
      const { fileId, isSelected } = action.payload;
      if (isSelected) {
        state.push(fileId); // Add fileId to the array if selected
      } else {
        return state.filter((id) => id !== fileId); // Remove fileId from the array if deselected
      }
    },
    selectAllFiles: (state, action) => {
      const { files, isSelected } = action.payload;
      if (isSelected) {
        return files.map((file) => file.id); // Add all file IDs to the array if selected
      } else {
        return []; // Clear the array if deselected
      }
    },
    deselectAllFiles: () => {
      return []; // Clear all selected file IDs
    },
  },
});

export const { selectFile, selectAllFiles, deselectAllFiles } =
  selectedFilesSlice.actions;

export default selectedFilesSlice.reducer;
