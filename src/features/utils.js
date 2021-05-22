export const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
].map((item) => item.toUpperCase());

export const sortByLastName = (a, b) => {
  if (a.lastName > b.lastName) {
    return 1;
  }
  if (a.lastName < b.lastName) {
    return -1;
  }
  return 0;
};

export const getEmployeeBirthdayMonth = (birthday) => {
  return new Date(birthday).toLocaleString("en-GB", { month: "long" });
};

export const getItemsFromLocalStorage = (key, defaultValue = {}) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultValue;
};

export const removeEmptyKeys = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key].length) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
