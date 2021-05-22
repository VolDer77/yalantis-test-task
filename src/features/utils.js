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

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const sortByLastName = (a, b) => {
  if (a.lastName > b.lastName) {
    return 1;
  }
  if (a.lastName < b.lastName) {
    return -1;
  }
  return 0;
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

export const sortByMonth = (obj) => {
  const currentMonth = new Date().getMonth();
  if (currentMonth === 0) return obj;
  const employeesBirthdayMonthes = Object.keys(obj).sort((a, b) => a - b);
  const previousMonthes = employeesBirthdayMonthes.filter((item) => +item < +currentMonth);
  console.log(previousMonthes);
  const postMonthes = employeesBirthdayMonthes.filter((item) => +item >= +currentMonth);
  console.log(postMonthes);
  console.log([...postMonthes, ...previousMonthes]);

  const result = [...postMonthes, ...previousMonthes].reduce((acc, item) => {
    const month = monthNames[item];
    acc[month] = obj[item] || [];

    return acc;
  }, {});
  return result;
};
