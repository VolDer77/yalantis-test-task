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

  useEffect(() => {
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
    console.log(employee, "get");
    const employeeBirthday = new Date(employee.dob).toLocaleString("en-GB", { month: "long" });
    const selectedEmployees = getItemsFromLocalStorage("selectedEmployees");
    if (selectedEmployees[employeeBirthday]) {
      localStorage.setItem(
        "selectedEmployees",
        JSON.stringify({
          ...selectedEmployees,
          [employeeBirthday]: sortSelectedEmployees(selectedEmployees[employeeBirthday], employee)
        })
      );
    } else {
      localStorage.setItem(
        "selectedEmployees",
        JSON.stringify({
          ...selectedEmployees,
          [employeeBirthday]: [employee]
        })
      );
    }
    setSelectedEmployees(getItemsFromLocalStorage("selectedEmployees"));
  } // TODO добавити сортування за місяцями

  function removeSelectedEmployee(employee) {
    console.log(employee);
    const employeeBirthday = new Date(employee.dob).toLocaleString("en-GB", { month: "long" });
    const selectedEmployees = getItemsFromLocalStorage("selectedEmployees");
    const updatedEmployees = {
      ...selectedEmployees,
      [employeeBirthday]: selectedEmployees[employeeBirthday].filter(
        (item) => item.id !== employee.id
      )
    };
    localStorage.setItem("selectedEmployees", JSON.stringify(removeEmptyKeys(updatedEmployees)));
    setSelectedEmployees(getItemsFromLocalStorage("selectedEmployees"));
  }

  return (
    <div className="app">
      <EmployeesList
        employees={employees}
        addSelectedEmployee={addSelectedEmployee}
        removeSelectedEmployee={removeSelectedEmployee}
      />
      <BirthdayList selectedEmployees={selectedEmployees} />
    </div>
  );
}

export default App;
