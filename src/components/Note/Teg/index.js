import React from 'react';
import s from './style.module.scss';
import {ReactComponent as CloseImg } from './close.svg';

const Note = ({ data }) => {
  const { id, teg } = data;

  const handleBtnRemoveTeg = (teg) => {
    console.log('remvoe teg');
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