import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./propertySlice";
import propertyidReducer from './propertyidSlice';
import slugReducer from './slugSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
     property: propertyReducer,
     propertyid:propertyidReducer,
     slug:slugReducer,
     user:userReducer
  },
});

export default store;
