import { combineReducers } from "redux";
import fileUploadSlice from "../slices/fileUploadSlice";
import filesGetSlice from "../slices/filesGetSlice";
import filesDeleteSlice from "../slices/filesDeleteSlice";
import fileDeleteSlice from "../slices/fileDeleteSlice";

const rootReducer = combineReducers({
  fileUpload: fileUploadSlice, // matches the name you used in `useSelector`
  filesGet: filesGetSlice,
  filesDelete: filesDeleteSlice,
  fileDelete: fileDeleteSlice,
});

export default rootReducer;
