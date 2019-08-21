// https://stackoverflow.com/questions/16637051/adding-space-between-numbers
const numberWithSpaces = function(n = 0) {
  const parts = n.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

export {
  numberWithSpaces,
};
