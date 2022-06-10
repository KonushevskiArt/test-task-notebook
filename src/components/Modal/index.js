import React from 'react';
import s from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { close } from '../../store/modalSlice';
import NoteContent from './NoteContent';

const Modal = () => {
  const modalContent = useSelector((state) => state.modal.content);
  const modalType = useSelector((state) => state.modal.type);
  const isActive = useSelector((state) => state.modal.isActive);
  const dispatch = useDispatch()
  return (
    <div 
      onClick={() => dispatch(close())} 
      className={isActive ? `${s.modal} ${s.activeModal}`: s.modal}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className={isActive ? `${s.modalContent} ${s.activeContent}`: s.modalContent}>
        {modalType === 'note' && 
          <NoteContent title={modalContent.title} tegs={modalContent.tegs} />}
      </div>
    </div>
  );
};

export default Modal;