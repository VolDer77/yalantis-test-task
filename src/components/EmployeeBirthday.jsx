import React from "react";

export const EmployeeBirthday = (prop) => {
  const { employee } = prop;
  const birthday = new Date(employee.dob);
  const birthdayString = `${birthday.getDate()} ${birthday.toLocaleString("en-GB", {
    month: "long"
  })}, ${birthday.getFullYear()} year`;

  return (
    <li className="employees-birthday__list-item">
      {employee.lastName} {employee.firstName} - {birthdayString}
    </li>
  );
};
