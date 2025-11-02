import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./propertySlice";
import propertyidReducer from './propertyidSlice';
import slugReducer from './slugSlice';
import userReducer from './userSlice';
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
     property: propertyReducer,
     propertyid:propertyidReducer,
     filterSlice:filterSlice,
     slug:slugReducer,
     user:userReducer
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⚠️ turns off the warning
    }),
});

export default store;
