import React, { useState } from "react";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar state

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`d-flex ${isCollapsed ? "collapsed" : ""}`}>
      <div className={`sidebar d-flex flex-column ${isCollapsed ? "collapsed" : ""}`} id="sidebar">
        
        {/* Toggle Button */}
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className={`bx ${isCollapsed ? "bx-chevron-right" : "bx-chevron-left"}`}></i>
        </button>

        <ul className="sidebar-nav flex-grow-1">
          <li className="nav-item nav-item-custom">
            <a href="/notes" className="nav-link nav-link-custom">
              <i className="bx bx-note" />
              <span className="nav-text nav-text-custom">Notes</span>
            </a>
          </li>
          <li className="nav-item nav-item-custom">
            <a href="/categories" className="nav-link nav-link-custom">
              <i className="bx bx-category" />
              <span className="nav-text nav-text-custom">Categories</span>
            </a>
          </li>
          <li className="nav-item nav-item-custom">
            <a href="/devices" className="nav-link nav-link-custom">
              <i className="bx bxs-devices" />
              <span className="nav-text nav-text-custom">Devices</span>
            </a>
          </li>
          <li className="nav-item nav-item-custom">
            <a href="/products" className="nav-link nav-link-custom">
              <i className="bx bx-notepad" />
              <span className="nav-text nav-text-custom">Projects</span>
            </a>
          </li>
          <li className="nav-item nav-item-custom">
            <a href="/products" className="nav-link nav-link-custom">
              <i className="bx bx-task" />
              <span className="nav-text nav-text-custom">To Do </span>
            </a>
          </li>
          <li className="nav-item nav-item-custom">
            <a href="/products" className="nav-link nav-link-custom">
              <i className="bx bx-calendar" />
              <span className="nav-text nav-text-custom">Calendar</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
