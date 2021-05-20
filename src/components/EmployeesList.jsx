import React from "react";
import PropTypes from "prop-types";
import { Employee } from "./Employee";

export const EmployeesList = (prop) => {
  const { employees, addSelectedEmployee, removeSelectedEmployee } = prop;
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

EmployeesList.proptypes = {
  employees: PropTypes.object.isRequired,
  addSelectedEmployee: PropTypes.func.isRequired,
  removeSelectedEmployee: PropTypes.func.isRequired
};
