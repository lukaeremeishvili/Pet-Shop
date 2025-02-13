import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  min-width: 350px;
  padding: 40px 24px;
  color: #fff;
  background-color: black;

  & > h2 {
    font-size: 24px;
    color: #f4f4f4;
    font-weight: 400;
    margin-bottom: 32px;
  }

  & > nav a {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    text-transform: capitalize;
    gap: 20px;
    font-size: 20px;
    padding: 12px 8px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  & .active {
    background-color: #598eda;
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/animals">Animals</NavLink>
          </li>
          <li>
            <NavLink to="/categories">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/animals-with-categories">
              Animals With Category
            </NavLink>
          </li>
        </ul>
      </nav>
    </StyledSidebar>
  );
};

export default Sidebar;
