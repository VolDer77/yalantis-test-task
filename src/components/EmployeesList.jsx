import React from "react";
import { Employee } from "./Employee";

export const EmployeesList = ({ employees, addSelectedEmployee, removeSelectedEmployee }) => {
  return (
    <div className="employees">
      <h2 className="employees-title">Employees</h2>
      <div className="employees-wrapper">
        {Object.entries(employees).map((employee, idx) => {
          const [letter, items] = employee;
          return (
            <section key={idx} className="employee-wrapper">
              <div>{letter}</div>
              {items.length > 0
                ? items.map((item) => (
                    <Employee
                      key={item.id}
                      employee={item}
                      addEmployee={addSelectedEmployee}
                      removeEmployee={removeSelectedEmployee}
                    />
                  ))
                : "----"}
            </section>
          );
        })}
      </div>
    </div>
  );
};
