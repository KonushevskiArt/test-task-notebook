import React from 'react';
import s from './style.module.scss';
import {ReactComponent as CloseImg } from './close.svg';
import notesService from '../../../utils/services/notesService';
import { useDispatch } from 'react-redux';
import { removeTeg } from '../../../store/notesSlice';

const Teg = ({ data }) => {
  const { id, teg, tegs: allTegs } = data;
  const dispatch = useDispatch()

  const handleBtnRemoveTeg = (teg) => {
    console.log('remvoe teg');
    const newTegs = allTegs.filter(el => el !== teg);
    console.log('newTegs////////', newTegs);
    notesService.removeTegInNoteById(id, {tegs: newTegs})
      .then(data => {
        dispatch(removeTeg({id, newTegs}));
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

export default Teg;