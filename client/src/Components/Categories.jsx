import React, { useEffect, useState } from "react";
import axios from "axios";
import "assets/categories.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "assets/notes.css";
import "assets/sidebar.css";
import AddCategoryModal from "Modals/AddCategoryModal";
import { useNavigate } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [save, setSave] = useState([]);
  const [variable, setVariable] = useState(false);
  const navigate = useNavigate();

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleAddCategory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/createcategory",
        {
          ...newCategory,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Hello");
      if (response.status === 201) {
        setCategories([...categories, response.data.category]);
        setSave([...categories, response.data.category]);
        setNewCategory({ title: "", description: "" });
        setShowAddCategoryModal(false);
      }
    } catch (error) {
      console.log("Error adding note:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/deletecategory?categoryId=${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedCategories = categories.filter(
          (category) => category._id !== categoryId
        );
        setCategories(updatedCategories);
        setSave(updatedCategories);
        setNewCategory({ title: "", description: "" });
      }
    } catch (error) {
      
      console.error("Error deleting category:", error);
    }
        }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data.categories);
        setSave(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [variable]);

  const handleSearch = (e) => {

    setCategories(
      save.filter((category) =>
        category.name.toLowerCase().includes(e.target.value.toLowerCase()) || category.description.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    if (e.target.value === "") {
      setVariable(!variable);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="container main-content " style={{ marginLeft: "230px" }}>
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
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        {categories.length === 0 && (
                <h1
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    fontStyle: "italic",
                    color: "gray",
                    fontSize: "25px",
                  }}
                >
                  No Categories available
                </h1>
              )}
        {categories.length > 0 && (<table
          className="category-table-c table table-bordered"
          style={{ marginTop: "20px", width: "800px" }}
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

                  <button className="btn btn-danger btn-danger-c btn-sm m-2" onClick={() => handleDelete(category._id)}>
                    <i className="bx bx-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>)}
        <button
          className="btn add-note-btn"
          style={{ backgroundColor: "#f7de52" }}
          onClick={() => setShowAddCategoryModal(true)}
        >
          <span className="plus-sign">
            <i className="bx bx-duplicate"></i>
          </span>
        </button>
        {/* <button className="btn add-note-btn">
          <span className="plus-sign">+</span>
        </button> */}
      </div>
      <AddCategoryModal
        showCategory={showAddCategoryModal}
        setShowCategory={setShowAddCategoryModal}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
      />
    </div>
  );
}

export default Categories;
