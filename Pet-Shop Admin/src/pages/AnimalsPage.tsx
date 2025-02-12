import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimalsRequest } from "../features/animals/store/animal.thunks";
import { animalSelector } from "../features/animals/store/animal.slice";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import styled from "styled-components";
import { IAnimal } from "../interfaces/animal.interface";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
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

const TD = styled.td`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AnimalsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { animalList, loading, error } = useAppSelector(animalSelector);

  useEffect(() => {
    dispatch(getAnimalsRequest());
  }, [dispatch]);

  const addAnimal = () => navigate("/animals/manage");

  const editAnimal = (animalId: string) =>
    navigate(`/animals/manage?id=${animalId}`);

  if (loading) return <Spinner />;
  if (error) return <Error text={error} />;

  return (
    <Container>
      <Heading title="animal" onAdd={addAnimal} />

      <Table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {animalList?.map((animal: IAnimal) => (
            <tr key={animal._uuid}>
              <TD>
                <img src={`./src/assets/${animal.image}`} alt={animal.name} />
                {animal.name}
              </TD>
              <td>{animal.description}</td>
              <td>${animal.price}</td>
              <td>{animal.stock}</td>
              <td>
                <button onClick={() => editAnimal(animal._uuid)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AnimalsPage;
