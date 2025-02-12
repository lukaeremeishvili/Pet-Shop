import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const ManageCategory = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");

  const [category, setCategory] = useState({
    title: categoryId ? "Existing Category" : "",
    description: categoryId ? "Category description" : "",
  });

  const handleChange = (e: any) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Saved:", category);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        {categoryId ? "Edit Category" : "Add Category"}
      </h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="title"
          value={category.title}
          onChange={handleChange}
          placeholder="Category Title"
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          value={category.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full mt-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 mt-4"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ManageCategory;
