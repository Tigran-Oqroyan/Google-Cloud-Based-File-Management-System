import { combineReducers } from 'redux';
import fileUploadSlice from '../slices/fileUploadSlice';

const rootReducer = combineReducers({
  fileUpload: fileUploadSlice, // matches the name you used in `useSelector`
});

export default rootReducer;
