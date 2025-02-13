import { useNavigate } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { categorySelector } from "../features/categories/store/category.slice";
import { useEffect } from "react";
import { getCategoriesRequest } from "../features/categories/store/category.thunks";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import styled from "styled-components";
import Table from "../components/Table";
import Heading from "../components/Heading";
import { ICategory } from "../interfaces/category.interface";

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
const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoryList, loading, error } = useAppSelector(categorySelector);

  useEffect(() => {
    dispatch(getCategoriesRequest());
  }, [dispatch]);

  const addCategory = () => navigate("/categories/manage");
  const editCategory = (uuid: string) =>
    navigate(`/categories/manage?id=${uuid}`);

  if (loading) return <Spinner />;
  if (error) return <Error text={error} />;

  return (
    <Container>
      <Heading
        title="categories"
        btnDescription="category"
        onAdd={addCategory}
      />

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {categoryList?.map((category: ICategory) => (
            <tr key={category._uuid}>
              <td>{category.title}</td>
              <td>{category.description}</td>

              <td>
                <button onClick={() => editCategory(category._uuid)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CategoriesPage;
