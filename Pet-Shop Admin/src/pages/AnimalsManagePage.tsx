import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AnimalForm from "../features/animals/components/AnimalForm";

const StyledAnimalManagePage = styled.div`
  & > h1 {
    text-transform: capitalize;
    margin-bottom: 2.5rem;
  }
`;

function AnimalsManagePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const animalUuid = queryParams.get("id");

  return (
    <StyledAnimalManagePage>
      <h1>{animalUuid ? "edit" : "add"} Pet</h1>

      <AnimalForm animalUuid={animalUuid} />
    </StyledAnimalManagePage>
  );
}

export default AnimalsManagePage;
