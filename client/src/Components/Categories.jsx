import React, { useEffect, useState } from "react";
import axios from "axios";
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
        "http://localhost:5000/api/v1/create-category",
        {
          ...newCategory,
         
        },
        {headers: {
          Authorization: `Bearer ${token}`,
        },}
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
      const response = await axios.delete(
        `http://localhost:5000/api/v1/delete-category?categoryId=${categoryId}`,
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
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/v1/get-categories",
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
      save.filter(
        (category) =>
          category.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          category.description
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      )
    );
    if (e.target.value === "") {
      setVariable(!variable);
    }
  };

  return (
    <div>
      <div className="container main-content" >
        <div className="container ">
          <div className="d-flex justify-content-center">
            <div className="input-group">
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
      {categories.length > 0 && (
  <div
    className="table-responsive-wrapper"
    style={{ overflowX: "auto", marginTop: "20px" }}
  >
    <table
      className="category-table-c table table-bordered"
      style={{ minWidth: "600px" }} // Ensure table has a minimum width
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
              <button
                className="btn btn-danger btn-danger-c btn-sm m-2"
                onClick={() => handleDelete(category._id)}
              >
                <i className="bx bx-trash" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        <button
          className="btn add-note-btn"
          style={{ backgroundColor: "#f7de52" }}
          onClick={() => setShowAddCategoryModal(true)}
        >
          <span className="plus-sign">
            <i className="bx bx-duplicate"></i>
          </span>
        </button>
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
