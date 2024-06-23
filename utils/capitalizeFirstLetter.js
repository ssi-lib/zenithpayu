export const capitalizeFirstLetter = (word) => {
  if (typeof word === 'string') {
    return word.charAt(0).toUpperCase() + word.slice(1);
  } else return word;
};
