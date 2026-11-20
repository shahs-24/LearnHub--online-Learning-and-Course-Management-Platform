
import { useState } from "react";
import { useAuth } from "../../hooks/fetchUser";
import Styles from "./_manageCategories.module.css";

const ManageCategories = () => {
  const { createLmsCategoryApi } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createLmsCategoryApi({
        name,
        description,
      });

      console.log(data);

      if (data?.success) {
        alert("Category created successfully");

        setName("");
        setDescription("");
      }
    } catch (error) {
      console.log("Error while creating category:", error);
      alert("Failed to create category");
    }
  };

  return (
    <section className={Styles.categoryPage}>

      <div className={Styles.header}>
        <h1>Manage Categories</h1>
        <p>Create and manage course categories.</p>
      </div>

      <div className={Styles.formCard}>

        <form onSubmit={handleSubmit}>

          <div className={Styles.formGroup}>
            <label>Category Name</label>

            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={Styles.formGroup}>
            <label>Description</label>

            <textarea
              placeholder="Enter category description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              required
            />
          </div>

          <button type="submit">
            Create Category
          </button>

        </form>

      </div>

    </section>
  );
};

export default ManageCategories;
