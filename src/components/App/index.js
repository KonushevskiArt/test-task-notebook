import React, { useState, useEffect } from 'react';
import './App.scss';
import Layout from '../Layout';
import ListOfNotes from '../ListOfNotes';
import { fetchData } from '../../utils/services/fetchData';
import NoteCreater from '../NoteCreater';
function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData().then((notes) => {
      setData(notes);
      setIsLoading(false);
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
