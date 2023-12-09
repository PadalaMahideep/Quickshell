import React from "react";
import { data } from "../Data";
import { priorityicons } from "../Data";
import { images } from "../Data";
import { priorityNames } from "../Data";
import { statusicons } from "../Data";

const Main = ({ selectedStatus, selectedOrdering }) => {
  const usersById = data.users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  //sort tickets based on priority

  const sortTicketsByPriority = (tickets) => {
    return tickets.slice().sort((a, b) => b.priority - a.priority);
  };

  const sortedPriorities = Object.keys(priorityNames)
    .map(Number)
    .filter((priority) => priority !== 0)
    .sort((a, b) => b - a);

  let organizedTickets = {};

  if (selectedStatus === "User-id") {
    const sortedUsers = [...data.users].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    sortedUsers.forEach((user) => {
      organizedTickets[user.name] = data.tickets.filter(
        (ticket) => ticket.userId === user.id
      );
    });
  } else if (selectedStatus === "priority") {
    organizedTickets["No Priority"] = data.tickets.filter(
      (ticket) => ticket.priority === 0
    );

    sortedPriorities.forEach((priority) => {
      const priorityLevel = priorityNames[priority] || "Unknown Priority";
      if (!organizedTickets[priorityLevel]) {
        organizedTickets[priorityLevel] = [];
      }
      data.tickets.forEach((ticket) => {
        if (ticket.priority === priority) {
          organizedTickets[priorityLevel].push(ticket);
        }
      });
    });
  } else {
    data.tickets.forEach((ticket) => {
      let groupKey = selectedStatus === "status" ? ticket.status : "Others";
      if (!organizedTickets[groupKey]) {
        organizedTickets[groupKey] = [];
      }
      organizedTickets[groupKey].push(ticket);
    });
  }

  if (selectedOrdering === "priority") {
    Object.keys(organizedTickets).forEach((group) => {
      organizedTickets[group] = sortTicketsByPriority(organizedTickets[group]);
    });
  }
  return (
    <div className="main">
      {Object.entries(organizedTickets).map(([group, tickets]) => (
        <div key={group} className="card">
          <div className="cardheader">
            <div className="username">
              <div>
                <div>
                  {selectedStatus === "User-id" && (
                    <div className="wrapimags">
                      {" "}
                      <img
                        className="userimg"
                        src={images[tickets[0].userId]}
                        alt={group}
                      />
                      <div
                        className={`aval ${
                          usersById[tickets[0].userId].available
                            ? "available"
                            : "unavailable"
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
                <div> {selectedStatus === "status" && statusicons[group]}</div>
                <div>
                  {" "}
                  {selectedStatus === "priority" && priorityicons[group]}
                </div>
              </div>
              <div>
                {group} {tickets.length}{" "}
              </div>
            </div>

            <div>
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="#323232"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 5L12 19"
                  stroke="#323232"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
                  fill="#1C274C"
                />
                <path
                  d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                  fill="#1C274C"
                />
                <path
                  d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                  fill="#1C274C"
                />
              </svg>
            </div>
          </div>
          {tickets.map((ticket) => (
            <div key={ticket.id}>
              <div className="card2">
                <div className="card21">
                  <div className="card22">
                    <div>{ticket.id}</div>
                    <div className="card22img">
                      {selectedStatus !== "User-id" && (
                        <div className="wrapimags">
                          {" "}
                          <img
                            className="userimg"
                            src={images[tickets[0].userId]}
                            alt={group}
                          />
                          <div
                            className={`aval ${
                              usersById[tickets[0].userId].available
                                ? "available"
                                : "unavailable"
                            }`}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="userbody">
                    <div>
                      {selectedStatus !== "status" && (
                        <div> {statusicons[ticket.status]}</div>
                      )}
                    </div>
                    <div>{ticket.title}</div>
                  </div>
                  <div className="cardfooter">
                    {selectedStatus !== "priority" && (
                      <div className="cdf1">
                        {priorityicons[ticket.priority]}
                      </div>
                    )}
                    <div className="cdf2">
                      <div
                        className={`aval1 ${
                          usersById[tickets[0].userId].available
                            ? "available"
                            : "unavailable"
                        }`}
                      ></div>

                      <div>{ticket.tag}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Main;
