import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { useForm } from "react-hook-form";
import { createNewNote } from '../../utils/createNewNote';
import { useDispatch } from 'react-redux';
import { filter, add, changeFilter } from '../../store/notesSlice';

const NoteCreater = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [filterValue, setFilterValue] = useState('');
  const dispatch = useDispatch()

  const onSubmit = ({ title }) => {
    const processedTitle = title.trim(); 
    if (processedTitle) {
      const newNote = createNewNote(processedTitle);
      dispatch(add(newNote));
      dispatch(filter({filterValue}));
      reset();
    }
  };

  useEffect(() => {
    dispatch(changeFilter({filterValue}));
    dispatch(filter());
  }, [filterValue]);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  }

  const maxLength = 150;
  
  return (
    <div className={s.NoteCreater}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputWrapper}>
          <input placeholder='enter text' className={s.input} {...register("title", { maxLength: maxLength })} />
          {errors.title && <span className={s.error}>You can't use more than {maxLength} characters</span>}
        </div>
        <button type='submit' className={`btn ${s.btnCreate}`}>
           create
        </button>
      </form>
      <div className={s.filterWrapper}>
        <label className={s.filterLabel}>
          <span className={s.filterLabelText}>Filter by tegs:</span>
          <input 
            onChange={handleFilterChange} 
            value={filterValue} 
            className={s.filterInput} 
            maxLength={100} 
            type="text" 
          />
        </label>
      </div>
    </div>
  );
};

export default NoteCreater;