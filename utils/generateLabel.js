import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export const generateLabel = (word) => {
  const split = word.split('_');

  if (split.length > 1) {
    return (
      capitalizeFirstLetter(split[0]) + ' ' + capitalizeFirstLetter(split[1])
    );
  } else return capitalizeFirstLetter(split[0]);
};
