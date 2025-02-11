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
import { IAnimal } from "../interfaces/animal.interface"; 
import { ICategory } from "../interfaces/category.interface"; 
import Spinner from "../components/Spinner";
import Error from "../components/Error";

const Container = styled.div`
  position: absolute;
  width: calc(100% - 430px);
  min-height: 80dvh;
  padding: 16px;
  background: #ffffff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #cccccc;
  font-size: 20px;
  font-weight: 500;
  padding-left: 24px;
`;

const Td = styled.td`
  padding: 12px;
  text-align: left;
  font-weight: 500;
  padding-left: 24px;
  border-bottom: 1px solid #cccccc;
`;

const Button = styled.button`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  background: none;
  color: #598eda;
  border: none;

  &:hover {
    color: #076fff;
  }
`;

const AddButton = styled.button`
  padding: 12px 20px;
  background-color: #1d69e4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0062ff;
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
  
  const { animalWithCategoryList, loading: animalWithCategoryLoading, error: animalWithCategoryError } = useAppSelector(animalWithCategorySelector);
  const { animalList, loading: animalLoading, error: animalError } = useAppSelector(animalSelector);
  const { categoryList, loading: categoryLoading, error: categoryError } = useAppSelector(categorySelector);

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

  const getAnimalName = (animalUuid: string) => {
    const animal = animalList.find((a: IAnimal) => a._uuid === animalUuid);
    return animal ? animal.name : "Unknown Animal";
  };

  const getCategoryTitle = (categoryUuid: string) => {
    const category = categoryList.find((c: ICategory) => c._uuid === categoryUuid);
    return category ? category.title : "Unknown Category";
  };

  if (animalWithCategoryLoading || animalLoading || categoryLoading) {
    return <Spinner />;
  }

  if (animalWithCategoryError || animalError || categoryError) {
    const errorText = animalWithCategoryError || animalError || categoryError || "An unknown error occurred.";
    return <Error text={errorText} />;
  }

  return (
    <StyledAnimalsWithCategoriesPage>
      <Container>
        <Header>
          <h1>Animals With Categories</h1>
          <AddButton onClick={handleAdd}>Add Animal With Category</AddButton>
        </Header>

        <Table>
          <thead>
            <tr>
              <Th>Animal Name</Th>
              <Th>Category Title</Th>
              <Th>Edit</Th>
            </tr>
          </thead>
          <tbody>
            {animalWithCategoryList.map((animalWithCategory: IAnimalWithCategory) => (
              <tr key={animalWithCategory._uuid}>
                <Td>{getAnimalName(animalWithCategory.animal_uuid)}</Td>
                <Td>{getCategoryTitle(animalWithCategory.category_uuid)}</Td>
                <Td>
                  <Button onClick={() => handleEdit(animalWithCategory._uuid)}>Edit</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </StyledAnimalsWithCategoriesPage>
  );
};

export default AnimalsWithCategoriesPage;
