// Categories.js
import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCategoryModal from "Modals/AddCategoryModal";
import { fetchCategories } from "services/apiServices";
import { checkToken } from "utils/CommonHelper";
import { deleteCategory } from "services/apiServices";
// import { ColorPicker, useColor } from "react-color-palette";
// import "react-color-palette/lib/css/styles.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [backupCategories, setBackupCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const navigate = useNavigate();
 

  const fetchAllCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data.categories);
      setBackupCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    if (searchText === "") {
      setCategories(backupCategories);
    } else {
      const filtered = backupCategories.filter(
        (category) =>
          category.name.toLowerCase().includes(searchText) ||
          category.description.toLowerCase().includes(searchText)
      );
      setCategories(filtered);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!checkToken()) {
      navigate("/");
      return;
    }
    try {
      const response = await deleteCategory(categoryId);
      if (response.status === 200) {
        const updatedCategories = categories.filter(
          (category) => category._id !== categoryId
        );
        setCategories(updatedCategories);
        setBackupCategories(updatedCategories);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleModalSuccess = (category) => {
    if (editingCategory) {
      const updatedList = categories.map((cat) =>
        cat._id === category._id ? category : cat
      );
      setCategories(updatedList);
      setBackupCategories(updatedList);
    } else {
      const updatedList = [...categories, category];
      setCategories(updatedList);
      setBackupCategories(updatedList);
    }
  };

  // const openModalForAdd = () => {
  //   setEditingCategory(null);
  //   setModalVisible(true);
  // };

  const openModalForEdit = (category = null) => {
    setEditingCategory(category);
    setModalVisible(true);
  };

  return (
    <div>
      <div className="container main-content">
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        {categories.length === 0 ? (
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
        ) : (
          <div
            className="table-responsive-wrapper table-wrapper-custom"
          >
            <table
              className="category-table-c table table-bordered"
              style={{ minWidth: "600px" }}
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
                  <tr key={category._id}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm m-2"
                        onClick={() => openModalForEdit(category)}
                      >
                        <i className="bx bx-edit" />
                      </button>
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
          onClick={openModalForEdit}
        >
          <span className="plus-sign">
            <i className="bx bx-duplicate"></i>
          </span>
        </button>
      </div>
      <AddCategoryModal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        categoryId={editingCategory ? editingCategory._id : ""}
        initialData={
          editingCategory
            ? {
                name: editingCategory.name,
                description: editingCategory.description,
              }
            : { name: "", description: "" }
        }
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

export default Categories;
