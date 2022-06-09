import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listOfNotes: [],
  filteredNotes: [],
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.listOfNotes = action.payload;
    },
    add: (state, action) => {
      state.listOfNotes.push(action.payload);
    },
    remove: (state, action) => {
      const index = state.listOfNotes.findIndex((el) => el.id === action.payload);
      state.listOfNotes.splice(index, 1);
    },
    edit: (state, action) => {
      const index = state.listOfNotes.findIndex((el) => el.id === action.payload.id);
      state.listOfNotes[index] = action.payload.fullNote;
      console.log('edit', action)
    },
    removeTeg: (state, action) => {
      const index = state.listOfNotes.findIndex((el) => el.id === action.payload.id)
      // const tegIndex = state.listOfNotes[index].tegs.findIndex(el => el === action.payload.teg);
      console.log(state.listOfNotes, action.payload.id)
      state.listOfNotes[index].tegs = action.payload.newTegs;
      console.log('edit', action)
    },
    filter: (state, action) => {
      // state.value += action.payload
      console.log('filter', action);
    }
  },
})

export const { add, remove, edit, filter, setList, removeTeg } = notesSlice.actions

export default notesSlice.reducer