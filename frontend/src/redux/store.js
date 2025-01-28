import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import resumeReducer from './reducers/resumeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    resume: resumeReducer
  }
});

export default store;