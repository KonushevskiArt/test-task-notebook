import React, { useState } from 'react';
import Note from '../Note';
import s from './style.module.scss';

function ListOfNotes({listOfNotes}) {
  return (
    <ul className={s.list}>
        {!listOfNotes.length && <li>There is no data</li>}
        {listOfNotes.length && listOfNotes.map(note => (
           <Note key={note.id} data={note} />
        ))}
    </ul>
  );
}

export default ListOfNotes;
