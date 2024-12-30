import React from 'react'

function Sidebar() {
  return (
    <div className="d-flex">
  <div className="sidebar d-flex flex-column" id="sidebar">
    <ul className="sidebar-nav flex-grow-1">
      <li className="nav-item">
        <a
          href="/notes"
          className="nav-link"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Notes"
        >
          <i className="bx bx-note" />
          <span className="nav-text">Notes</span>
        </a>
      </li>
      <li className="nav-item">
        <a
          href="/categories"
          className="nav-link"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Categories"
        >
          <i className="bx bx-category" />
          <span className="nav-text">Categories</span>
        </a>
          </li>
          <li className="nav-item">
        <a
          href="/devices"
          className="nav-link"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Categories"
        >
          <i className="bx bx-phone" />
          <span className="nav-text">Devices</span>
        </a>
      </li>
    </ul>
  </div>
</div>
  )
}

export default Sidebar