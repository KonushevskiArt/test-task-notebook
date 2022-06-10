import React from 'react';
import s from './style.module.scss';
import {ReactComponent as CloseImg } from './close.svg';
import { useDispatch } from 'react-redux';
import { removeTeg, filter } from '../../../store/notesSlice';

const Teg = ({ data }) => {
  const { id, teg, tegs: allTegs } = data;
  const dispatch = useDispatch()

  const handleBtnRemoveTeg = (teg) => {
    const newTegs = allTegs.filter(el => el !== teg);
    dispatch(removeTeg({id, newTegs}));
    dispatch(filter());
  }

  return (
    <li key={teg + Math.random()} className={s.teg}>
      <span className={s.tegContent}>{teg}</span>
      <button 
        onClick={() => handleBtnRemoveTeg(teg)} 
        className={s.btnRemoveTeg}
      >
        <CloseImg className={s.img} />
      </button>
    </li>
  );
};

export default Teg;