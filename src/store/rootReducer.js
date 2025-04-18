import { combineReducers } from "redux";
import fileUploadSlice from "../slices/fileUploadSlice";
import filesGetSlice from "../slices/filesGetSlice";
import filesDeleteSlice from "../slices/filesDeleteSlice";
import fileDeleteSlice from "../slices/fileDeleteSlice";
import fileTypeSlice from "../slices/fileTypeSlice";
import selectedFilesSlice from '../slices/selectedFilesSlice';
import languageSlice from '../slices/languageSlice';

const rootReducer = combineReducers({
  fileUpload: fileUploadSlice,
  filesGet: filesGetSlice,
  filesDelete: filesDeleteSlice,
  fileDelete: fileDeleteSlice,
  fileType: fileTypeSlice,
  selectedFiles: selectedFilesSlice,
  language: languageSlice,
});

export default rootReducer;
