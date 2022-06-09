import axios from 'axios';
const url = 'http://localhost:3002/notes';
const prodUrl = window.location.href + 'localhost:3002/notes'; 

const notesService = {
  getAll: () => {
    return axios.get(url).then(data => data.data);
  },
  createOne: (note) => {
    return axios.post(url, note).then(data => data.data);
  },
  removeOneById: (id) => {
    return axios.delete(`${url}/${id}`).then(data => data.data);
  },
  editOneById: (id, newData) => {
    return axios.put(`${url}/${id}`, newData).then(data => data.data);
  },
  removeTegInNoteById: (id, newData) => {
    return axios.patch(`${url}/${id}`, newData).then(data => data.data);
  }
} 

export default notesService;