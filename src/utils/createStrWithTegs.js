export const createStrWithTegs = (str, tegs) => {
  return str.split(' ').map(word => {
    if (tegs.includes(word)) {
      return '#' + word; 
    }
    return word;
  }).join(' ');
} 