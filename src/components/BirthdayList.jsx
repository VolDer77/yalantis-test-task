import React from "react";
import PropTypes from "prop-types";

export const BirthdayList = (prop) => {
  const { selectedEmployees } = prop;
  return (
    <div className="emloyees-birhday">
      <h2 className="emloyees-birhday__title">Employees birthday</h2>
      <div className="employees-birthday__wrapper">
        {Object.keys(selectedEmployees).length > 0 ? (
          Object.entries(selectedEmployees).map((employee, idx) => {
            const [month, items] = employee;
            return (
              <section key={idx}>
                {selectedEmployees[month].length > 0 && <h4>{month}</h4>}
                <ul>
                  {items &&
                    items.map((item) => {
                      const birthday = new Date(item.dob);
                      const birthdayString = `${birthday.getDate()} ${birthday.toLocaleString(
                        "en-GB",
                        { month: "long" }
                      )}, ${birthday.getFullYear()} year`;
                      return (
                        <li key={`${item.id}-${idx}`}>
                          {item.lastName} {item.firstName} {birthdayString}
                        </li>
                      );
                    })}
                </ul>
              </section>
            );
          })
        ) : (
          <h3>Employees List is empty</h3>
        )}
      </div>
    </div>
  );
};

BirthdayList.proptypes = {
  selectedEmployees: PropTypes.object.isRequired
};
