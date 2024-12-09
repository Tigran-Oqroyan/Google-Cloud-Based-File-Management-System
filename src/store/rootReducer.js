import { combineReducers } from "redux";
import fileUploadSlice from "../slices/fileUploadSlice";
import filesGetSlice from "../slices/filesGetSlice";

const rootReducer = combineReducers({
  fileUpload: fileUploadSlice, // matches the name you used in `useSelector`
  filesGet: filesGetSlice,
});

export default rootReducer;
