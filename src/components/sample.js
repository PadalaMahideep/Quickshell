import React from "react";
import { data } from "../Data";
import "../Header.css";
import img1 from "../Images/anime3.jpg";

const Main = ({ selectedStatus, selectedPriority }) => {
  console.log("Received Status:", selectedStatus);
  console.log("Received Priority:", selectedPriority);

  const usersById = data.users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  let groupedTickets;

  if (selectedStatus === "user") {
    // Group tickets by user
    groupedTickets = data.tickets.reduce((acc, ticket) => {
      const userName = usersById[ticket.userId].name;
      if (!acc[userName]) {
        acc[userName] = [];
      }
      acc[userName].push(ticket);
      return acc;
    }, {});

    // Sort the grouped tickets by user name
    groupedTickets = Object.keys(groupedTickets)
      .sort()
      .reduce((acc, key) => {
        acc[key] = groupedTickets[key];
        return acc;
      }, {});
  } else {
    // ... handle other grouping logic
  }

  // Filter tickets based on selected status and priority
  const filteredTickets = data.tickets.filter((ticket) => {
    const statusMatch =
      selectedStatus &&
      selectedStatus !== "priority" &&
      selectedStatus !== "status"
        ? ticket.status === selectedStatus
        : true;
    const priorityMatch = selectedPriority
      ? ticket.priority === parseInt(selectedPriority, 10)
      : true;
    return statusMatch && priorityMatch;
  });

  console.log("Filtered Tickets:", filteredTickets);

  // Organize tickets based on selected status or priority
  const organizedTickets = filteredTickets.reduce((acc, ticket) => {
    let groupKey;

    if (selectedStatus === "priority") {
      groupKey = ticket.priority; // Group by priority
    } else {
      groupKey = ticket.status; // Group by status
    }

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(ticket);
    return acc;
  }, {});

  console.log("Organized Tickets:", organizedTickets);

  Object.keys(organizedTickets).forEach((groupKey) => {
    organizedTickets[groupKey].sort((a, b) => b.priority - a.priority);
  });

  console.log("Organized Tickets:", organizedTickets);

  // Sort tickets within each group based on priority
  Object.keys(organizedTickets).forEach((groupKey) => {
    organizedTickets[groupKey].sort((a, b) => b.priority - a.priority);
  });

  console.log("Organized Tickets:", organizedTickets);
  // Rendering logic remains the same
  // ...
  console.log("Selected Status:", selectedStatus);
  console.log("Filtered Tickets:", filteredTickets);
  console.log("Organized Tickets:", organizedTickets);
  return (
    <div>
      <div className="main">
        {Object.entries(organizedTickets).map(([status, tickets]) => (
          <div key={status}>
            <div className="card">
              <div className="cardheader">
                <div>
                  {status} {tickets.length}
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
                        <div>{ticket.id} </div>
                        <div className="card22img">
                          <img src={img1} alt={`img-${ticket.id}`} />
                        </div>
                      </div>
                      <div>{ticket.title}</div>
                      <div className="cardfooter">
                        <div>
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25Z"
                              fill="#1C274C"
                            />
                            <path
                              d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
                              fill="#1C274C"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.0574 1.25H11.9426C9.63424 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63422 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62177 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62177 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62177 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z"
                              fill="#1C274C"
                            />
                          </svg>
                        </div>
                        <div>{ticket.tag.join(", ")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
