import React, { useState } from "react";

export const Employee = ({ employee, addEmployee, removeEmployee }) => {
  const [active, setActive] = useState(getActivnessFromLocalStorage());

  function getActivnessFromLocalStorage() {
    return JSON.parse(localStorage.getItem(employee.id)) ? true : false;
  }

  return (
    <div className="employee-content">
      <div className={active ? "employee-active" : ""}>
        {employee.lastName} {employee.firstName}
      </div>
      <div className="btn-group">
        <div>
          <input
            type="radio"
            name={employee.firstName}
            defaultChecked
            value={!active}
            onChange={() => {
              setActive(false);
              removeEmployee(employee);
              // localStorage.removeItem(employee.id);
            }}
          />
          <label htmlFor="not active">not active</label>
        </div>
        <div>
          <input
            type="radio"
            name={employee.firstName}
            value={true}
            checked={active}
            onChange={() => {
              setActive(true);
              addEmployee(employee);
              // localStorage.setItem(employee.id, true);
            }}
          />
          <label htmlFor="active">active</label>
        </div>
      </div>
    </div>
  );
};
