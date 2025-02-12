import "./tailwind.css";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container mx-auto flex items-center justify-between">
        <div className="logo">
          <NavLink to="/home" className="text-3xl">
            <Icon icon="fxemoji:dog" className="inline-block" />
          </NavLink>
          <NavLink to="/home">
            <h4 className="font-poppins">PawStore</h4>
          </NavLink>
        </div>

        <div className="navbar">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "font-bold text-black" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "font-bold text-black" : ""
            }
          >
            Animals
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "font-bold text-black" : ""
            }
          >
            Categories
          </NavLink>
        </div>

        <div className="icons flex gap-4">
          <NavLink
            to="/wishlist"
            className="hover:text-red-600 hover:scale-110 transition-all duration-200"
          >
            <Icon icon="akar-icons:heart" className="text-3xl" />
          </NavLink>
          <NavLink
            to="/cart"
            className="hover:text-blue-600 hover:scale-110 transition-all duration-200"
          >
            <Icon icon="mdi:shopping-cart-outline" className="text-3xl" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
