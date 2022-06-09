import { selectTagsFromString } from "./selectTagsFromString";

export const createNewNote = (title) => {
  const tegs = selectTagsFromString(title);
  const titleWithoutTegs = title.replace(/#/g, ''); 
  return {title: titleWithoutTegs, tegs: tegs} 
} 