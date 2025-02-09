import "./tailwind.css";
import { Icon } from "@iconify/react";

const Header = () => {
  return (
    <header className="header">
      <div className="container mx-auto flex items-center justify-between">
        <div className="logo">
          <span className="text-2xl">
            <Icon icon="fxemoji/dog" className="inline-block" />
          </span>
          <a href="/home">
            <h3>PawStore</h3>
          </a>
        </div>

        <div className="navbar">
          <a href="/home">Home</a>
          <a href="/about">Animals</a>
          <a href="/categories">Categories</a>
        </div>

        <div className="icons">
          <a href="/cart">
            <Icon icon="akar-icons/shopping-cart" className="text-2xl" />
          </a>
          <a href="/wishlist">
            <Icon icon="akar-icons/heart" className="text-2xl" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
