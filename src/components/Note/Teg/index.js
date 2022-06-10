import React from 'react';
import s from './style.module.scss';
import {ReactComponent as CloseImg } from './close.svg';
import notesService from '../../../utils/services/notesService';
import { useDispatch } from 'react-redux';
import { removeTeg, filter } from '../../../store/notesSlice';
import { toast } from 'react-toastify';
import {toastOptions} from '../../../utils/toastOptions';

const Teg = ({ data }) => {
  const { id, teg, tegs: allTegs } = data;
  const dispatch = useDispatch()

  const handleBtnRemoveTeg = (teg) => {
    const newTegs = allTegs.filter(el => el !== teg);
    notesService.removeTegInNoteById(id, {tegs: newTegs})
      .then(data => {
        dispatch(removeTeg({id, newTegs}));
        dispatch(filter());
      })
      .catch(error => {
        toast.error('Network error!', toastOptions);
        console.log(error);
      });
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