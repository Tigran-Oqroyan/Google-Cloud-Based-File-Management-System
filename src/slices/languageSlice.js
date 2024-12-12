import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: "am",
  reducers: {
    changeLanguage: (state, action) => {
      const language = action.payload;
      return language;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
