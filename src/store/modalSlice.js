import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isActive: false,
  content: {},
  type: 'note'
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    show: (state, action) => {
      state.isActive = true;
    },
    close: (state, action) => {
      state.isActive = false;
    },
    setContent: (state, action) => {
      console.log()
      state.content = action.payload.content;
      if (action.payload.type) state.type = action.payload.type 
    },
  },
})

export const { show, close, setContent } = modalSlice.actions

export default modalSlice.reducer