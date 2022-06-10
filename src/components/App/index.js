import React, { useState, useEffect } from 'react';
import './App.scss';
import Layout from '../Layout';
import ListOfNotes from '../ListOfNotes';
import NoteCreater from '../NoteCreater';
import notesService from '../../utils/services/notesService';
import { useSelector, useDispatch } from 'react-redux';
import { setList, filter } from '../../store/notesSlice';
import Modal from '../Modal';

function App() {
  const listOfNotes = useSelector((state) => state.notes.filteredNotes);
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    notesService.getAll()
    .then((data) => {
        dispatch(setList(data))
        dispatch(filter());
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        console.log("Network error:", e.message);
      })
  }, [])
 
  return (
    <div className="app">
      <Layout>
        <NoteCreater />
        {isLoading && <p className='loading blink'>Laoding...</p>}
        {isError && <p className='networkError'>Network error!</p>}
        {listOfNotes && !isLoading && <ListOfNotes listOfNotes={listOfNotes} />}
      </Layout>
      <Modal />
    </div>
  );
}

export default App;
