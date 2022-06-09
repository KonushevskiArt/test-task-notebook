export const selectTagsFromString = (str) => {
  const arrOfTegs = str.match(/#(.*?)\s|#(.*?)$/g) || [];
  return arrOfTegs.map(teg => teg.trim().replace('#', '')).filter(teg => teg);  
}