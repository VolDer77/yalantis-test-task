import React, { useEffect, useState } from "react";
import { BirthdayList } from "./components/BirthdayList";
import { EmployeesList } from "./components/EmployeesList";

import {
  alphabet,
  sortByLastName,
  getItemsFromLocalStorage,
  removeEmptyKeys
} from "./features/utils";
import { getEmployees } from "./features/api";

function App() {
  const [employees, setEmployees] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState(
    getItemsFromLocalStorage("selectedEmployees")
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEmployees()
      .then(({ data }) => {
        const employeesArr = data.reduce((acc, item) => {
          const firstLetter = item.lastName.slice(0, 1);
          if (acc[firstLetter]) {
            acc[firstLetter].push(item);
          } else {
            acc[firstLetter] = [item];
          }
          return acc;
        }, {});
        setEmployees(getSortedEmployees(employeesArr));
        setLoading(false);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  function getSortedEmployees(employees) {
    const orderedValues = Object.entries(employees).reduce((acc, item) => {
      const values = item[1];
      values.sort(sortByLastName);
      return acc;
    }, employees);

    const result = alphabet.sort().reduce((acc, item) => {
      acc[item] = orderedValues[item] || [];
      return acc;
    }, {});

    return result;
  }

  function sortSelectedEmployees(arr, employee) {
    const newArr = [...arr, employee];
    return newArr.sort(sortByLastName);
  }

  function addSelectedEmployee(employee) {
    const month = new Date(employee.dob).getMonth();
    const selectedEmployees = getItemsFromLocalStorage("selectedEmployees");
    if (selectedEmployees[month]) {
      localStorage.setItem(
        "selectedEmployees",
        JSON.stringify({
          ...selectedEmployees,
          [month]: sortSelectedEmployees(selectedEmployees[month], employee)
        })
      );
    } else {
      localStorage.setItem(
        "selectedEmployees",
        JSON.stringify({
          ...selectedEmployees,
          [month]: [employee]
        })
      );
    }
    setSelectedEmployees(getItemsFromLocalStorage("selectedEmployees"));
  }

  function removeSelectedEmployee(employee) {
    const month = new Date(employee.dob).getMonth();
    const selectedEmployees = getItemsFromLocalStorage("selectedEmployees");
    const updatedEmployees = {
      ...selectedEmployees,
      [month]: selectedEmployees[month].filter((item) => item.id !== employee.id)
    };
    localStorage.setItem("selectedEmployees", JSON.stringify(removeEmptyKeys(updatedEmployees)));
    setSelectedEmployees(getItemsFromLocalStorage("selectedEmployees"));
  }

  return (
    <div className="app">
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <EmployeesList
            employees={employees}
            addSelectedEmployee={addSelectedEmployee}
            removeSelectedEmployee={removeSelectedEmployee}
          />
          <BirthdayList selectedEmployees={selectedEmployees} />
        </>
      )}
    </div>
  );
}

export default App;
