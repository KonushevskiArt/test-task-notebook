import React, {useState} from 'react';
import s from './style.module.scss';
import Teg from './Teg';
import notesService from '../../utils/services/notesService';
import { useHighlightTags } from '../../hooks/useHighlightTags';
import { createStrWithTegs } from '../../utils/createStrWithTegs';
import { createNewNote } from '../../utils/createNewNote';
import { useDispatch } from 'react-redux';
import { edit, remove, filter } from '../../store/notesSlice';
import { show, setContent,  } from '../../store/modalSlice';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
import {toastOptions} from '../../utils/toastOptions';

const Note = ({ data }) => {
  const { title, id, tegs } = data;
  const dispatch = useDispatch()
  const [isSaveLoading, setSaveLoading] = useState(false);
  const [isRemoveLoading, setRemoveLoading] = useState(false);
  const [previousValue, setPreviousValue] = useState(title);
  const [currentTitleWithTegs, setCurrentTitleWithTegs] = useState(title);
  const [isEdit, setEdit] = useState(false);

  const noteClickHandler = () => {
    dispatch(show());
    dispatch(setContent({content: {title, tegs}}));
  }

  const removeNoteHandler = () => {
    setRemoveLoading(true);
    notesService.removeOneById(id)
    .then(data => {
      setRemoveLoading(false);
      dispatch(remove(id));
      dispatch(filter());
    })
    .catch(error => {
      setRemoveLoading(false);
      toast.error('Network error!', toastOptions);
      console.log(error);
    });
  }

  const handleEdit = () => {
    setEdit(true);
    const strWithTegs = createStrWithTegs(title, tegs);
    setCurrentTitleWithTegs(strWithTegs);
    setPreviousValue(strWithTegs)
  }

  const handleChangeTitle = (e) => {
    setCurrentTitleWithTegs(e.currentTarget.value);
  }

  const handleSave = () => {
    if (currentTitleWithTegs !== previousValue) {
      const newNote = createNewNote(currentTitleWithTegs);
      setSaveLoading(true);
      notesService.editOneById(id, newNote)
      .then(data => {
        setEdit(false);
        const fullNote = {...newNote, id};
        setSaveLoading(false);
        dispatch(edit({id, fullNote}));
        dispatch(filter());
      })
      .catch(error => {
        setEdit(false);
        toast.error('Network error!', toastOptions);
        setSaveLoading(false);
        console.log(error);
      });
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
            (<button disabled={isSaveLoading} onClick={handleSave} className={`btn ${s.btnEdit}`}>
              {isSaveLoading && <Spinner />} save
            </button>)
          }
          <button disabled={isRemoveLoading} type='button' onClick={removeNoteHandler} className={`btn ${s.btnRemove}`}>
            {isRemoveLoading && <Spinner />} remove
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