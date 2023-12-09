import React, { useState } from "react";
import "../Header.css";

const Header = ({ onStatusChange, onPriorityChange }) => {
  const [selectedGrouping, setSelectedGrouping] = useState("status");
  const [selectedOrdering, setSelectedOrdering] = useState("");
  const [isDisplayDropdownOpen, setDisplayDropdownOpen] = useState(false);

  const handleGroupingChange = (event) => {
    const newGrouping = event.target.value;

    setSelectedGrouping(newGrouping);

    onStatusChange(newGrouping);
    setDisplayDropdownOpen(false);
  };

  const handleOrderingChange = (event) => {
    const newOrdering = event.target.value;

    setSelectedOrdering(newOrdering);
    onPriorityChange(newOrdering);
    setDisplayDropdownOpen(false);
  };

  const toggleDisplayDropdown = () => {
    setDisplayDropdownOpen(!isDisplayDropdownOpen);
  };

  return (
    <div className="head">
      <div>
        <button className="display" onClick={toggleDisplayDropdown}>
          <div>
            <svg
              width="35px"
              height="30px"
              viewBox="0 0 58 58"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter
                  id="a"
                  width="200%"
                  height="200%"
                  x="-50%"
                  y="-50%"
                  filterUnits="objectBoundingBox"
                >
                  <feOffset
                    dy="1"
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                  />
                  <feGaussianBlur
                    stdDeviation="10"
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                  />
                  <feColorMatrix
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    in="shadowBlurOuter1"
                    result="shadowMatrixOuter1"
                  />
                  <feMerge>
                    <feMergeNode in="shadowMatrixOuter1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                fill-rule="evenodd"
                d="M31.171 34h-11.179c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h11.179c.412 1.165 1.523 2 2.829 2 1.306 0 2.417-.835 2.829-2h1.179c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-1.179c-.412-1.165-1.523-2-2.829-2-1.306 0-2.417.835-2.829 2zm-3.341-5h10.179c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-10.179c-.412-1.165-1.523-2-2.829-2-1.306 0-2.417.835-2.829 2h-2.179c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h2.179c.412 1.165 1.523 2 2.829 2 1.306 0 2.417-.835 2.829-2zm3.341-9h-11.179c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h11.179c.412 1.165 1.523 2 2.829 2 1.306 0 2.417-.835 2.829-2h1.179c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-1.179c-.412-1.165-1.523-2-2.829-2-1.306 0-2.417.835-2.829 2zm2.829 2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-9 5c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm9 9c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                filter="url(#a)"
              />
            </svg>
          </div>
          <div> Display </div>
          <div>
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </button>

        <div className="float">
          {isDisplayDropdownOpen && (
            <div className="float1">
              <div className="float2">
                <div>Grouping</div>
                <div>
                  <select
                    id="groupingDropdown"
                    value={selectedGrouping}
                    onChange={handleGroupingChange}
                  >
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                    <option value="User-id">User</option>
                  </select>
                </div>
              </div>

              <div className="float2">
                <div>Ordering</div>
                <div>
                  <select
                    id="orderingDropdown"
                    value={selectedOrdering}
                    onChange={handleOrderingChange}
                  >
                    <option value="">select</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
