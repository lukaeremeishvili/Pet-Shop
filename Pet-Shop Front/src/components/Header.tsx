const Header = () => {
    return (
      <header>
        <div className="container">
          <div className="logo">
            <a href="/home">
              <h1>
                Pet<span>Shop</span>
              </h1>
            </a>
          </div>
          <div className="navbar">
            <a href="/home">Home</a>
            <a href="/about">Animals</a>
            <a href="/categories">Categories</a>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;