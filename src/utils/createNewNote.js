import { selectTagsFromString } from "./selectTagsFromString";
import { v4 as uuidv4 } from 'uuid';

export const createNewNote = (title) => {
  const tegs = selectTagsFromString(title);
  const titleWithoutTegs = title.replace(/#/g, ''); 
  return {title: titleWithoutTegs, tegs: tegs, id: uuidv4()} 
} 