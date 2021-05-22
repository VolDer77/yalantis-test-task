import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getItemsFromLocalStorage } from "../features/utils";

export const Employee = (prop) => {
  const { employee, addEmployee, removeEmployee } = prop;
  const [active, setActive] = useState(getItemsFromLocalStorage(employee.id, false));

  useEffect(() => {
    if (active) {
      localStorage.setItem(employee.id, true);
    } else {
      localStorage.removeItem(employee.id);
    }
  }, [active]);

  return (
    <div className="employee-content">
      <h4 className={`employee-name ${active ? "active" : ""}`}>
        {employee.lastName} {employee.firstName}
      </h4>
      <div className="btn-group">
        <div className="not-active-wrapper">
          <input
            type="radio"
            name={employee.firstName}
            id={`${employee.id}-not-active`}
            value={false}
            checked={!active}
            onChange={() => {
              setActive(false);
              removeEmployee(employee);
            }}
          />
          <label htmlFor={`${employee.id}-not-active`}>not active</label>
        </div>
        <div className="active-wrapper">
          <input
            type="radio"
            name={employee.firstName}
            id={`${employee.id}-active`}
            value={true}
            checked={active}
            onChange={() => {
              setActive(true);
              addEmployee(employee);
            }}
          />
          <label htmlFor={`${employee.id}-active`}>active</label>
        </div>
      </div>
    </div>
  );
};

Employee.proptypes = {
  employee: PropTypes.object.isRequired,
  addEmployee: PropTypes.func.isRequired,
  removeEmployee: PropTypes.func.isRequired
};
