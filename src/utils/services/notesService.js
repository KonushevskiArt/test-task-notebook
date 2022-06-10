import axios from 'axios';
const url = 'http://localhost:3000/db.json';

const notesService = {
  getAll: () => {
    return axios.get(url).then(data => data.data);
  },
} 

export default notesService;