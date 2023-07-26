import {   configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import addUserSlice from "rtk/feature/addUserSlice";
const rootReducer = combineReducers({
   user:addUserSlice
});
//configure store
const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
});

export default store; 