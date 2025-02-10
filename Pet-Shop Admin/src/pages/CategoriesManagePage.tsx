import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CategoryForm from "../features/categories/components/CategoryForm";

const StyledCategoriesManagePage = styled.div`
  width: 60%;
  margin: 0 auto;

  & > h1 {
    text-transform: capitalize;
    margin-bottom: 2.5rem;
  }
`;

function CategoriesManagePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryUuid = queryParams.get("id");

  return (
    <StyledCategoriesManagePage>
      <h1>{categoryUuid ? "edit" : "add"} Category</h1>

      <CategoryForm categoryUuid={categoryUuid} />
    </StyledCategoriesManagePage>
  );
}

export default CategoriesManagePage;
