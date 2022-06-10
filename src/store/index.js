import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice'; 
import modalReducer from './modalSlice'; 

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    modal: modalReducer,
  },
})