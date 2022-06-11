import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listOfNotes: [],
  filteredNotes: [],
  filter: '',
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.listOfNotes = action.payload.notes;
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
      state.listOfNotes[index] = action.payload.updatedNote;
    },
    removeTeg: (state, action) => {
      const index = state.listOfNotes.findIndex((el) => el.id === action.payload.id)
      state.listOfNotes[index].tegs = action.payload.newTegs;
    },
    filter: (state, action) => {
      if (state.filter.trim().length === 0) {
        state.filteredNotes = state.listOfNotes; 
      } else {
        const tegs = state.filter.split(/\s+/g);
        const filteredList =  state.listOfNotes.filter((note) => {
          return tegs.every(teg => note.tegs.includes(teg));
        })
        state.filteredNotes = filteredList; 
      }
    },
    changeFilter: (state, action) => {
      state.filter = action.payload.filterValue.trim() || '';
    }
  },
})

export const { add, remove, edit, filter, setList, removeTeg, changeFilter } = notesSlice.actions

export default notesSlice.reducer