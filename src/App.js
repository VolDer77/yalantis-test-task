import React, { useEffect, useState } from "react";
import axios from "axios";

import { alphabet } from "./utils/alphabet";

function App() {
  const URL = `https://yalantis-react-school-api.yalantis.com/api/task0/users`;
  const [employees, setEmployees] = useState({});

  useEffect(() => {
    axios
      .get(URL)
      .then(({ data }) => {
        const employees = data.reduce((acc, item) => {
          const firstLetter = item.firstName.slice(0, 1);
          if (acc[firstLetter]) {
            acc[firstLetter].push(item);
          } else {
            acc[firstLetter] = [item];
          }
          return acc;
        }, {});
        setEmployees(sortByLastName(employees));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  function sortByLastName(employees) {
    const orderedValues = Object.entries(employees).reduce((acc, item) => {
      const values = item[1];
      values.sort((a, b) => {
        if (a.lastName > b.lastName) {
          return 1;
        }
        if (a.lastName < b.lastName) {
          return -1;
        }
        return 0;
      });
      return acc;
    }, employees);

    const result = alphabet.sort().reduce((acc, item) => {
      acc[item] = orderedValues[item];
      return acc;
    }, {});
    return result;
  }

  return <div className="app"></div>;
}

export default App;
