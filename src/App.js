import React, { useEffect, useState } from "react";
import { BirthdayList } from "./components/BirthdayList";
import { EmployeesList } from "./components/EmployeesList";

import { alphabet } from "./utils/alphabet";
import { getEmployees } from "./utils/api";

function App() {
  const [employees, setEmployees] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState({});

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
        setEmployees(sortByLastName(employeesArr));
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
      acc[item] = orderedValues[item] || [];
      return acc;
    }, {});

    return result;
  }

  function getEmployeesFromLocalStorage() {}

  function sortSelectedEmployees(arr, employee) {
    const newArr = [...arr, employee];
    return newArr.sort((a, b) => {
      if (a.lastName > b.lastName) {
        return 1;
      }
      if (a.lastName < b.lastName) {
        return -1;
      }
      return 0;
    });
  }

  function addSelectedEmployee(employee) {
    const employeeBirthday = new Date(employee.dob).toLocaleString("en-GB", { month: "long" });
    setSelectedEmployees((employees) => {
      if (employees[employeeBirthday]) {
        return {
          ...employees,
          [employeeBirthday]: sortSelectedEmployees(employees[employeeBirthday], employee)
        };
      } else {
        return {
          ...employees,
          [employeeBirthday]: [employee]
        };
      }
    });
    // localStorage.setItem(employee.id, employee);
  }

  function removeEmptyKeys(obj) {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key].length) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  }

  function removeSelectedEmployee(employee) {
    const employeeBirthday = new Date(employee.dob).toLocaleString("en-GB", { month: "long" });
    setSelectedEmployees((employees) => {
      const updatedEmployees = {
        ...employees,
        [employeeBirthday]: employees[employeeBirthday].filter((item) => item.id !== employee.id)
      };
      return removeEmptyKeys(updatedEmployees);
    });
    // localStorage.removeItem(employee.id);
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
