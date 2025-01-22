import React from 'react'

function Sidebar() {
  return (
    <div className="d-flex">
  <div className="sidebar d-flex flex-column" id="sidebar">
    <ul className="sidebar-nav flex-grow-1">
      <li className="nav-item nav-item-custom">
        <a
          href="/notes"
          className="nav-link nav-link-custom"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Notes"
        >
          <i className="bx bx-note" />
          <span className="nav-text nav-text-custom">Notes</span>
        </a>
      </li>
      <li className="nav-item nav-item-custom">
        <a
          href="/categories"
          className="nav-link nav-link-custom"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Categories"
        >
          <i className="bx bx-category" />
          <span className="nav-text nav-text-custom">Categories</span>
        </a>
          </li>
          <li className="nav-item nav-item-custom">
        <a
          href="/devices"
          className="nav-link nav-link-custom"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Categories"
        >
          <i className="bx bxs-devices" />
          <span className="nav-text nav-text-custom">Devices</span>
        </a>
          </li>
          <li className="nav-item nav-item-custom">
        <a
          href="/products"
          className="nav-link nav-link-custom"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Categories"
        >
          <i className="bx bx-food-menu" />
          <span className="nav-text nav-text-custom">Subjects</span>
        </a>
      </li>
    </ul>
  </div>
</div>
  )
}

export default Sidebar