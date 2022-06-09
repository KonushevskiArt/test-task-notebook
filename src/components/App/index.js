import React, { useState, useEffect } from 'react';
import './App.scss';
import Layout from '../Layout';
import ListOfNotes from '../ListOfNotes';
import NoteCreater from '../NoteCreater';
import notesService from '../../utils/services/notesService';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    notesService.getAll()
    .then((notes) => {
        setData(notes);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        console.log("Network error:", e.message);
      })
  }, [])
 
  return (
    <div className="app">
      <Layout>
        <NoteCreater />
        {isLoading && <p>Laoding...</p>}
        {isError && <p>Error...</p>}
        {data.length && <ListOfNotes data={data} />}
      </Layout>
    </div>
  );
}

export default App;
