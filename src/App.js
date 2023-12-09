import React, { useState } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import "./Header.css";

function App() {
  const [selectedStatus, setSelectedStatus] = useState("status");
  const [selectedOrdering, setSelectedOrdering] = useState("");

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const handleOrderingChange = (newOrdering) => {
    setSelectedOrdering(newOrdering);
  };

  return (
    <div className="body">
      <Header
        onStatusChange={handleStatusChange}
        onPriorityChange={handleOrderingChange}
      />
      <Main
        selectedStatus={selectedStatus}
        selectedOrdering={selectedOrdering}
      />
    </div>
  );
}

export default App;
