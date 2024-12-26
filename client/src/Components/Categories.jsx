import React, { useEffect, useState } from "react";
import axios from "axios";
import "assets/categories.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "assets/notes.css";
import "assets/sidebar.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  },[]);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="container main-content">
        <div className="container ">
          <div className="d-flex justify-content-center">
            <div className="input-group" style={{ maxWidth: 300 }}>
              {/* <span className="input-group-text" id="basic-addon1">
                  <i className="bx bx-search" />
                </span> */}
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
        <table
          className="category-table-c table table-bordered"
          style={{ marginTop: "20px", width: "80%" }}
        >
          <thead>
            <tr>
              <th>No.</th>
              <th>Category</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button className="btn btn-primary btn-primary-c btn-sm m-2">
                    <i className="bx bx-edit-alt" />
                  </button>
                  <button className="btn btn-danger btn-danger-c btn-sm m-2">
                    <i className="bx bx-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn add-cat-btn">
          <span className="plus-sign">
            <i className="bx bx-duplicate"></i>
          </span>
        </button>
        <button className="btn add-note-btn">
          <span className="plus-sign">+</span>
        </button>
      </div>
    </div>
  );
}

export default Categories;
