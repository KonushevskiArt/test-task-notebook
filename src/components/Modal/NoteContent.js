import React from 'react';
import s from './style.module.scss';
import { close } from '../../store/modalSlice';
import { useDispatch } from 'react-redux';
import {ReactComponent as CloseImg } from './close.svg';

const NoteContent = ({title = '', tegs = []}) => {
  const dispatch = useDispatch()
  return (
    <div>
        <h4>Title: <span className={s.title}>{title}</span></h4>
        <p>Tegs: <span className={s.tegs}>{tegs.join(', ')}</span></p>
        <button className={s.closeBtn} onClick={() => dispatch(close())}>
          <CloseImg className={s.closeIcon} />
        </button> 
    </div>
  );
};

export default NoteContent;