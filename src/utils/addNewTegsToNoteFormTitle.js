import { selectTagsFromString } from "./selectTagsFromString";

export const addNewTegsToNoteFormTitle = (id, title, tegs) => {
  const newTegs = selectTagsFromString(title);
  const titleWithoutTegs = title.replace(/#/g, '') + ' '; 
  const tegsWithoutRepetitions = newTegs.filter(newTeg => !tegs.includes(newTeg) )
  return {id, title: titleWithoutTegs, tegs: [...tegs, ...tegsWithoutRepetitions]};
}