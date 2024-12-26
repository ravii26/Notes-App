import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    };

  return (
    <nav className="navbar navbar-expand-lg text-white shadow-m px-3" style={{
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    }}>
          <div className="container-fluid">
              <a href="/notes" style={{ textDecoration: "none" }}>
        <h1 className="navbar-brand text-white mb-0"><i className='bx bx-notepad'></i>Notes</h1></a>
        <div className="d-flex">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
