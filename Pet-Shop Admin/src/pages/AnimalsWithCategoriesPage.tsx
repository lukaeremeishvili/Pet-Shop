import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getAnimalsWithCategoryRequest } from "../features/animals-with-categories/store/animalWithCategory.thunks";
import { getAnimalsRequest } from "../features/animals/store/animal.thunks";
import { getCategoriesRequest } from "../features/categories/store/category.thunks";
import { animalWithCategorySelector } from "../features/animals-with-categories/store/animalWithCategory.slice";
import { animalSelector } from "../features/animals/store/animal.slice";
import { categorySelector } from "../features/categories/store/category.slice";
import { IAnimalWithCategory } from "../interfaces/animalWithCategory.interface";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import Heading from "../components/Heading";
import Table from "../components/Table";

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

const StyledAnimalsWithCategoriesPage = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

const AnimalsWithCategoriesPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    animalWithCategoryList,
    loading: animalWithCategoryLoading,
    error: animalWithCategoryError,
  } = useAppSelector(animalWithCategorySelector);
  const {
    animalList,
    loading: animalLoading,
    error: animalError,
  } = useAppSelector(animalSelector);
  const {
    categoryList,
    loading: categoryLoading,
    error: categoryError,
  } = useAppSelector(categorySelector);

  useEffect(() => {
    if (!animalList.length) {
      dispatch(getAnimalsRequest());
    }
    if (!categoryList.length) {
      dispatch(getCategoriesRequest());
    }
    if (!animalWithCategoryList.length) {
      dispatch(getAnimalsWithCategoryRequest());
    }
  }, [dispatch, animalList, categoryList, animalWithCategoryList]);

  const handleAdd = () => navigate("/animals-with-categories/manage");

  const handleEdit = (animalWithCategoryId: string) => {
    navigate(`/animals-with-categories/manage?id=${animalWithCategoryId}`);
  };

  if (animalWithCategoryLoading || animalLoading || categoryLoading)
    return <Spinner />;
  if (animalWithCategoryError || animalError || categoryError) {
    const errorText =
      animalWithCategoryError ||
      animalError ||
      categoryError ||
      "An unknown error occurred.";
    return <Error text={errorText} />;
  }

  return (
    <StyledAnimalsWithCategoriesPage>
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
                    <button
                      onClick={() => handleEdit(animalWithCategory._uuid)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Container>
    </StyledAnimalsWithCategoriesPage>
  );
};

export default AnimalsWithCategoriesPage;
