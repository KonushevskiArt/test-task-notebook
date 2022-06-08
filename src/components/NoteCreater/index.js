import React from 'react';
import s from './style.module.scss';
import { useForm } from "react-hook-form";

const NoteCreater = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const onSubmit = data => console.log(data);
  const maxLength = 80;
  
  return (
    <div className={s.NoteCreater}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='enter text' className={s.input} {...register("message", { maxLength: maxLength })} />
        {errors.message && <span>You can't use more than {maxLength} characters</span>}
        <div className={s.btnWrapper}>
          <button className={`btn ${s.btnCreate}`}>create</button>
          <button className={`btn ${s.btnFilter}`}>filter</button>
        </div>
      </form>
    </div>
  );
};

export default NoteCreater;