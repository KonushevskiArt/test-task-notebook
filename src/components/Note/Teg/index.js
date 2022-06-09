import React from 'react';
import s from './style.module.scss';
import {ReactComponent as CloseImg } from './close.svg';
import notesService from '../../../utils/services/notesService';

const Note = ({ data }) => {
  const { id, teg, tegs: allTegs } = data;

  const handleBtnRemoveTeg = (teg) => {
    console.log('remvoe teg');
    const newTegs = allTegs.filter(el => el !== teg);
    notesService.removeTegInNoteById(id, {tegs: newTegs})
      .then(data => {
        console.log('response data:', data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <li key={teg + Math.random()} className={s.teg}>
      <span className={s.tegContent}>{teg}</span>
      <button 
        onClick={() => handleBtnRemoveTeg(teg)} 
        className={`btn ${s.btnRemoveTeg}`}
      >
        <CloseImg className={s.img} />
      </button>
    </li>
  );
};

export default Note;