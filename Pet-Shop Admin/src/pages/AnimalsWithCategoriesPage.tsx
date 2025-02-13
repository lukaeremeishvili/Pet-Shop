import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getAnimalsWithCategoryRequest } from "../features/animals-with-categories/store/animalWithCategory.thunks";
import { animalWithCategorySelector } from "../features/animals-with-categories/store/animalWithCategory.slice";
import { IAnimalWithCategory } from "../interfaces/animalWithCategory.interface";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import Heading from "../components/Heading";
import Table from "../components/Table";
import { PAGE } from "./pageConig";

const Container = styled.div`
  position: absolute;
  width: calc(100% - 430px);
  height: 80dvh;
  padding: 16px;
  background: #ffffff;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color: #598eda;
    border-radius: 10px;
    border: 1px solid #5151517e;

    &:hover {
      background-color: #076fff;
    }
  }
`;

const AnimalsWithCategoriesPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    animalWithCategoryList,
    loading: animalWithCategoryLoading,
    error: animalWithCategoryError,
  } = useAppSelector(animalWithCategorySelector);

  useEffect(() => {
    dispatch(getAnimalsWithCategoryRequest());
  }, [dispatch]);

  const handleAdd = () => navigate(PAGE.animal_with_category_manage);

  const handleEdit = (animalWithCategoryId: string) => {
    navigate(`${PAGE.animal_with_category_manage}?id=${animalWithCategoryId}`);
  };

  if (animalWithCategoryLoading) return <Spinner />;
  if (animalWithCategoryError) {
    const errorText = animalWithCategoryError || "An unknown error occurred.";
    return <Error text={errorText} />;
  }

  return (
    <Container>
      <Heading
        title="animals with category"
        btnDescription="animals with category"
        onAdd={handleAdd}
      />

      <Table>
        <thead>
          <tr>
            <th>Animal Name</th>
            <th>Category Title</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {animalWithCategoryList?.map(
            (animalWithCategory: IAnimalWithCategory) => (
              <tr key={animalWithCategory._uuid}>
                <td>{animalWithCategory.name}</td>
                <td>{animalWithCategory.title}</td>
                <td>
                  <button onClick={() => handleEdit(animalWithCategory._uuid)}>
                    Edit
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AnimalsWithCategoriesPage;
