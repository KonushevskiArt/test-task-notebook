import axios from 'axios';
const url = window.location.href + 'db.json';

const notesService = {
  getAll: () => {
    return axios.get(url).then(data => data.data);
  },
} 

export default notesService;