import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./propertySlice";
import slugReducer from './slugSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
     property: propertyReducer,
     slug:slugReducer,
     user:userReducer
  },
});

export default store;
