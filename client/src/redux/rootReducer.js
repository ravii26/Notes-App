import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import notesReducer from './slices/notesSlice';
import categoriesReducer from './slices/categoriesSlice';
import productReducer from './slices/productSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
  categories: categoriesReducer,
  products: productReducer,
});

export default rootReducer;