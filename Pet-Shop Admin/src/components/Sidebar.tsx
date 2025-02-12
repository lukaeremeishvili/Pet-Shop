import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/animals"
              className="block p-2 rounded hover:bg-gray-700"
            >
              Animals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className="block p-2 rounded hover:bg-gray-700"
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/animals-with-categories"
              className="block p-2 rounded hover:bg-gray-700"
            >
              Both
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
