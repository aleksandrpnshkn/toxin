// https://stackoverflow.com/questions/16637051/adding-space-between-numbers
const numberWithSpaces = function(n = 0) {
  const parts = n.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

const getNoun = function(num, one, two, five) {
  let lastDigits = num % 100;

  if (lastDigits > 4 && lastDigits < 21) {
    return five;
  }

  lastDigits %= 10;

  if (lastDigits === 1) {
    return one;
  } else if (lastDigits > 4 || lastDigits === 0) {
    return five;
  } else {
    return two;
  }
};

export {
  numberWithSpaces,
  getNoun,
};
