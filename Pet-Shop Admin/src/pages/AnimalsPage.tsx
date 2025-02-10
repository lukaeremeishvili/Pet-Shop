import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimalsRequest } from "../features/animals/store/animal.thunks";
import { animalSelector } from "../features/animals/store/animal.slice";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import PageContainer from "../layouts/PageContainer";
import styled from "styled-components";
import { IAnimal } from "../interfaces/animal.interface";
import Error from "../components/Error";
import Spinner from "../components/Spinner";


const Container = styled.div`
  position: absolute;
  width: calc(100% - 430px);
  min-height: 80dvh;
  padding: 16px;
  background: #ffffff;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #333;
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
  border: 1px solid #ffffff;
  background-color: hsl(0, 0%, 100%);
  color: black;
  border-bottom: 2px solid #cccccc;
  font-size: 20px;
  font-weight: 500;
  padding-left: 24px;
  padding-right: 140px;
`;

const Td = styled.td`
  padding: 12px;
  text-align: left;
  font-weight: 500;
  border: 1px solid #ffffff;
  padding-left: 24px;
`;

const TableImage = styled.img`
  width: 50px;
  height: auto;
  border-radius: 50%;
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

const CoffeeList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
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

const AnimalsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { animalList,  loading, error } = useAppSelector(animalSelector);

  useEffect(() => {
    dispatch (getAnimalsRequest())
  }, [dispatch]);

  const addAnimal = () => navigate("/animals/manage");

  const editAnimal = (animalId: string) => navigate(`/animals/manage?id=${animalId}`);

  if (loading)  {
    return <Spinner/>
  }
  if (error) {
    return <Error text={error} />;
  }

  return (
    <PageContainer>
      <Container>
        <CoffeeList>
          <Heading>Animals</Heading>
          <AddButton onClick={addAnimal}>Add Animal</AddButton>
        </CoffeeList>

        <Table>
          <thead>
            <tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {animalList?.map((animal: IAnimal) => (
              <tr key={animal._uuid}>
                <Td>
                  <TableImage src={animal.image} alt={animal.name} />
                </Td>
                <Td>{animal.name}</Td> 
                <Td>{animal.description}</Td>
                <Td>${animal.price}</Td>
                <Td>{animal.stock}</Td>
                <Td>
                  <Button onClick={() => editAnimal(animal._uuid)}>Edit</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </PageContainer>
  );
};

export default AnimalsPage;
