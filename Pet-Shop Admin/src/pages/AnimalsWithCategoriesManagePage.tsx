import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AnimalWithCategoryForm from "../features/animals-with-categories/components/AnimalWithCategoryForm";

const StyledAnimalWithCategoryManagePage = styled.div`
  & > h1 {
    text-transform: capitalize;
    margin-bottom: 2.5rem;
  }
`;

function AnimalsWithCategoriesManagePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const animalWithCategoryUuid = queryParams.get("id");

  return (
    <StyledAnimalWithCategoryManagePage>
      <h1>{animalWithCategoryUuid ? "edit" : "add"} Animal With Category</h1>

      <AnimalWithCategoryForm animalWithCategoryUuid={animalWithCategoryUuid} />
    </StyledAnimalWithCategoryManagePage>
  );
}

export default AnimalsWithCategoriesManagePage;
