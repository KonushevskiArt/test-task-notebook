import React, { useState, useEffect } from 'react';
import './App.scss';
import Layout from '../Layout';
import ListOfNotes from '../ListOfNotes';
import NoteCreater from '../NoteCreater';
import notesService from '../../utils/services/notesService';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    notesService.getAll()
    .then((notes) => {
        console.log(notes)
        setData(notes);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("Network error:", e.message);
      })
  }, [])
 
  return (
    <div className="app">
      <Layout>
        <NoteCreater />
        {isLoading && <p>Laoding...</p>}
        {data.length && <ListOfNotes data={data} />}
      </Layout>
    </div>
  );
}

export default App;
