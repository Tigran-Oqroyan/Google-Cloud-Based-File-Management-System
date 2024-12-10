import { createSlice } from "@reduxjs/toolkit";

const fileTypeSlice = createSlice({
  name: "filesFilter",
  initialState: {
    type: "all",
  },
  reducers: {
    changeType: (state, action) => {
      const type = action.payload;
      state.type = type;
    },
  },
});

export const { changeType } = fileTypeSlice.actions
export default fileTypeSlice.reducer;
