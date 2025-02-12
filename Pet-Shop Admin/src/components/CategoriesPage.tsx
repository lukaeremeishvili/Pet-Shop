import { Link } from "react-router-dom";

const CategoriesPage = () => {
  // ფიქტიური მონაცემები (სერვერიდან წამოსაღებად API-ს გამოიყენებ)
  const categories = [
    { id: 1, title: "Dogs", description: "Different breeds of dogs." },
    { id: 2, title: "Cats", description: "Various cat breeds." },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Categories</h1>
      <Link
        to="/categories/manage"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
      >
        Add Category
      </Link>
      <ul className="mt-4">
        {categories.map((category) => (
          <li key={category.id} className="border p-2 mt-2">
            <h2 className="font-semibold">{category.title}</h2>
            <p>{category.description}</p>
            <Link
              to={`/categories/manage?id=${category.id}`}
              className="text-blue-500"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
