import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./propertySlice";
import propertyidReducer from './propertyidSlice';
import slugReducer from './slugSlice';
import userReducer from './userSlice';
import filterSlice from "./filterSlice";
import featureReducer from "./featureSlice";
import enquireSlice from "./enquireSlice";
import titleSlug from './titleSlice';

const store = configureStore({
  reducer: {
     property: propertyReducer,
     propertyid:propertyidReducer,
     filterSlice:filterSlice,
     slug:slugReducer,
     user:userReducer,
     feature:featureReducer,
     enquire:enquireSlice,
     title:titleSlug
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⚠️ turns off the warning
    }),
});

export default store;
