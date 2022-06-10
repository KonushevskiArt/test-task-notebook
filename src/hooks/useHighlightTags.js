export const useHighlightTags = (str = '', tegs = []) => {
  return str.split(/\s+/).map((word, i) => {
    if (tegs.includes(word)) {
      return  i === 0 
        ? (<span key={word + i} className='highLight'>{word}</span>) 
        : (<span key={word + i} className='highLight'> {word}</span>)
    } else {
      return i === 0 ? word : ' ' + word;
    }
  })
}