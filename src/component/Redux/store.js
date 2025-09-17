import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./propertySlice";
import slugReducer from './slugSlice';

const store = configureStore({
  reducer: {
     property: propertyReducer,
     slug:slugReducer
  },
});

export default store;
