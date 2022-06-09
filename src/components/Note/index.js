import React, {useState} from 'react';
import s from './style.module.scss';
import { useForm } from "react-hook-form";
import Teg from './Teg';

const Note = ({ data }) => {
  const { title, id, tegs } = data;
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const noteClickHandler = () => {
    console.log('open modal');
  }

  const onSubmit = data => console.log(data);

  const maxLength = 80;

  return (
    <li className={s.Note}>
       <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        {!isEdit && (
          <div className={s.content}>
            <h4 className={s.title} onClick={noteClickHandler}>{title}</h4>
            
          </div>
        )}
        {isEdit && (
          <input 
            placeholder='enter text' 
            className={s.input} 
            {...register("message", { maxLength: maxLength })} 
          />
        )}
        {errors.message && <span>You can't use more than {maxLength} characters</span>}
        <div className={s.btnWrapper}>
          <button onClick={() => setIsEdit(!isEdit)} className={`btn ${s.btnEdit}`}>edit</button>
          <button className={`btn ${s.btnRemove}`}>remove</button>
        </div>
      </form>
      <ul className={s.tegsWrapper}>
        {tegs.map((teg, i) => {
          if (i < 10) {
            return (
              <Teg key={teg + Math.random()} data={{id, teg}} />
            )
          }
          return null;
        })}
      </ul>
    </li>
  );
};

export default Note;