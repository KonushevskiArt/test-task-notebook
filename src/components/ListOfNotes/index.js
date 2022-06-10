import React from 'react';
import Note from '../Note';
import s from './style.module.scss';

function ListOfNotes({listOfNotes}) {
  return (
    <ul className={s.list}>
        {!listOfNotes.length && <li className={s.noNote}>There is no one note!</li>}
        {listOfNotes.length > 0 && listOfNotes.map(note => (
           <Note key={note.id} data={note} />
        ))}
    </ul>
  );
}

export default ListOfNotes;
