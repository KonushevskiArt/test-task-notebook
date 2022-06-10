import React, {useState} from 'react';
import s from './style.module.scss';
import Teg from './Teg';
import { useHighlightTags } from '../../hooks/useHighlightTags';
import { createStrWithTegs } from '../../utils/createStrWithTegs';
import { createNewNote } from '../../utils/createNewNote';
import { useDispatch } from 'react-redux';
import { edit, remove, filter } from '../../store/notesSlice';
import { show, setContent,  } from '../../store/modalSlice';

const Note = ({ data }) => {
  const { title, id, tegs } = data;
  const dispatch = useDispatch()
  const [previousValue, setPreviousValue] = useState(title);
  const [currentTitleWithTegs, setCurrentTitleWithTegs] = useState(title);
  const [isEdit, setEdit] = useState(false);

  const noteClickHandler = () => {
    dispatch(show());
    dispatch(setContent({content: {title, tegs}}));
  }

  const removeNoteHandler = () => {
    dispatch(remove(id));
    dispatch(filter());
  }

  const handleEdit = () => {
    setEdit(true);
    const strWithTegs = createStrWithTegs(title, tegs);
    setCurrentTitleWithTegs(strWithTegs);
    setPreviousValue(strWithTegs);
  }

  const handleChangeTitle = (e) => {
    setCurrentTitleWithTegs(e.currentTarget.value);
  }

  const handleSave = () => {
    if (currentTitleWithTegs !== previousValue) {
      const newNote = createNewNote(currentTitleWithTegs);
      setEdit(false);
      const fullNote = {...newNote, id};
      dispatch(edit({id, fullNote}));
      dispatch(filter());
    }
    else {
      setEdit(false);
    }
  }

  const maxLength = 160;
  const highLightTitle = useHighlightTags(title, tegs);

  return (
    <li className={s.Note}>
       <div className={s.form}>
        {!isEdit && (
            <h4 className={s.title} onClick={noteClickHandler}>{highLightTitle}</h4>
        )}
        {isEdit && (
          <textarea 
            maxLength={maxLength}
            defaultValue={currentTitleWithTegs}
            className={s.textarea} 
            onChange={(e) => handleChangeTitle(e)}
          />
        )}
        <div className={s.btnWrapper}>
          {!isEdit 
            ? 
            (<button onClick={handleEdit} className={`btn ${s.btnEdit}`}>
              edit
            </button>)
            :
            (<button onClick={handleSave} className={`btn ${s.btnEdit}`}>
              save
            </button>)
          }
          <button type='button' onClick={removeNoteHandler} className={`btn ${s.btnRemove}`}>
            remove
          </button>
        </div>
      </div>
      <ul className={s.tegsWrapper}>
        {tegs.map((teg, i) => {
          if (i < 10) {
            return (
              <Teg key={teg + Math.random()} data={{id, teg, tegs}} />
            )
          }
          return null;
        })}
      </ul>
    </li>
  );
};

export default Note;