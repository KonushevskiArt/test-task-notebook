import React, { useState, useEffect } from 'react';
import './App.scss';
import Layout from '../Layout';
import ListOfNotes from '../ListOfNotes';
import NoteCreater from '../NoteCreater';
import notesService from '../../utils/services/notesService';
import { useSelector, useDispatch } from 'react-redux';
import { setList } from '../../store/notesSlice';

function App() {
  const listOfNotes = useSelector((state) => state.notes.listOfNotes);
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    notesService.getAll()
    .then((data) => {
        dispatch(setList(data))
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
        {listOfNotes.length && <ListOfNotes listOfNotes={listOfNotes} />}
      </Layout>
    </div>
  );
}

export default App;
