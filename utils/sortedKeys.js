export const sortedKeys = (keys, order) => {
  return keys.sort((a, b) => {
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);

    if (indexA === -1 && indexB === -1) {
      return 0; // both keys not in order, maintain original order
    } else if (indexA === -1) {
      return 1; // a not in order, b in order, b comes first
    } else if (indexB === -1) {
      return -1; // a in order, b not in order, a comes first
    } else {
      return indexA - indexB; // both in order, compare their indices
    }
  });
};
