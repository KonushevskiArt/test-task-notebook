import React from 'react';
import s from './style.module.scss';
import { useForm } from "react-hook-form";
import notesService from '../../utils/services/notesService';
import { selectTagsFromString } from '../../utils/selectTagsFromString';
import { createNewNote } from '../../utils/createNewNote';

const NoteCreater = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const onSubmit = ({ title }) => {
    const newNote = createNewNote(title);
    notesService.createOne(newNote)
    .then(data => {
      console.log('response data:', data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const maxLength = 80;
  
  return (
    <div className={s.NoteCreater}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputWrapper}>
          <input placeholder='enter text' className={s.input} {...register("title", { maxLength: maxLength })} />
          {errors.title && <span className={s.error}>You can't use more than {maxLength} characters</span>}
        </div>
        <div className={s.btnWrapper}>
          <button className={`btn ${s.btnCreate}`}>create</button>
          <button className={`btn ${s.btnFilter}`}>filter</button>
        </div>
      </form>
    </div>
  );
};

export default NoteCreater;