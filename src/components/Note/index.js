import React, {useState, useRef, useEffect} from 'react';
import s from './style.module.scss';
import Teg from './Teg';
import { useHighlightTags } from '../../hooks/useHighlightTags';
import { useDispatch } from 'react-redux';
import { edit, remove, filter } from '../../store/notesSlice';
import { show, setContent,  } from '../../store/modalSlice';
import { addNewTegsToNoteFormTitle } from '../../utils/addNewTegsToNoteFormTitle';
import { validation } from '../../utils/validation';

const Note = ({ data }) => {
  const { title, id, tegs } = data;
  const refTitle = useRef(null);
  const dispatch = useDispatch()
  const [previousValue, setPreviousValue] = useState(title);
  const [validErrorMessage, setValidErrorMessage] = useState('');
  const [isValidError, setValidError] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEdit, setEdit] = useState(false);

  const highLightTitle = useHighlightTags(title, tegs);
  const classesOfTitle = isEdit ? `${s.title} ${s.editTitle}`: s.title;

  const titleClickHandler = () => {
    if(!isEdit) {
      dispatch(show());
      dispatch(setContent({content: {title, tegs}}));
    }
  }

  const removeNoteHandler = () => {
    dispatch(remove(id));
    dispatch(filter());
  }

  useEffect(() => {
    if(isEdit) refTitle.current.focus();
  }, [isEdit])

  const handleEdit = () => {
    setEdit(true);
    setPreviousValue(currentTitle);
  }

  const handleChangeTitle = (e) => {
    validation.editTitle(e.target.textContent, setValidError, setValidErrorMessage);
    if (!isValidError) {
      setCurrentTitle(e.target.textContent);
    }
  }

  const handleSave = () => {
    if (!isValidError) {
      const trimmedCurrentTitle = currentTitle.trim(); 
      if (trimmedCurrentTitle !== previousValue) { 
         const updatedNote = addNewTegsToNoteFormTitle(id, trimmedCurrentTitle, tegs);
         dispatch(edit({id, updatedNote}));
         dispatch(filter());
         setEdit(false);
      }
      else {
        setEdit(false);
      }
    }
  }

  return (
    <li className={s.Note}>
       <div className={s.form}>
        {!isEdit && (
          <h4 
            title={!isEdit ? 'click to display the modal window': null}
            onClick={titleClickHandler}
            className={classesOfTitle} >
              {highLightTitle}  
          </h4>
        )}
        {isEdit && ( 
            <div>
              <h4 
              autoFocus={isEdit}
              onInput={handleChangeTitle} 
              ref={refTitle}
              contentEditable={isEdit} 
              suppressContentEditableWarning={true}
              onClick={titleClickHandler}
              value={highLightTitle}
              className={classesOfTitle} >
                {highLightTitle}&nbsp;  
            </h4>
            <p className={s.validationMessage}>{validErrorMessage}</p>
          </div>
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