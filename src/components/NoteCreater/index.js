import React from 'react';
import s from './style.module.scss';
import { useForm } from "react-hook-form";
import notesService from '../../utils/services/notesService';
import { createNewNote } from '../../utils/createNewNote';
import { useDispatch } from 'react-redux';
import { filter, add } from '../../store/notesSlice';

const NoteCreater = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch()

  const onSubmit = ({ title }) => {
    const newNote = createNewNote(title);
    notesService.createOne(newNote)
    .then(data => {
      dispatch(add(data));
      reset();
    })
    .catch(error => {
      console.log(error);
    });
  };

  const maxLength = 150;
  
  return (
    <div className={s.NoteCreater}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputWrapper}>
          <input placeholder='enter text' className={s.input} {...register("title", { maxLength: maxLength })} />
          {errors.title && <span className={s.error}>You can't use more than {maxLength} characters</span>}
        </div>
        <div className={s.btnWrapper}>
          <button type='submit' className={`btn ${s.btnCreate}`}>create</button>
          <button type='button' className={`btn ${s.btnFilter}`}>filter</button>
        </div>
      </form>
    </div>
  );
};

export default NoteCreater;