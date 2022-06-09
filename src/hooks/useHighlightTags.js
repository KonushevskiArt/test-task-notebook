export const useHighlightTags = (str = '', tegs = []) => {
  return str.split(' ').map((word, i) => {
    if (tegs.includes(word)) {
      return <span key={word + i} className='highLight'>{word}</span> 
    } else {
      return i === 0 ? word + ' ' : ' ' + word + ' ';
    }
  })
}