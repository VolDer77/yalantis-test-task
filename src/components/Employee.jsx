import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const Employee = (prop) => {
  const { employee, addEmployee, removeEmployee } = prop;
  const [active, setActive] = useState(localStorage.getItem(employee.id) ? true : false);

  useEffect(() => {
    if (active) {
      localStorage.setItem(employee.id, true);
    } else {
      localStorage.removeItem(employee.id);
    }
  }, [active]);

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
            // defaultChecked
            value={false}
            checked={!active}
            onChange={() => {
              setActive(false);
              removeEmployee(employee); // ломається (якось добавляти юзерів в локал сторедж і забирати в App)
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
            }}
          />
          <label htmlFor="active">active</label>
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
