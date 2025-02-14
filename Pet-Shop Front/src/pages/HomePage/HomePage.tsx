import useFetch from "../../hooks/useFetch";
import { IAnimalWithCategory } from "../../interfaces/animalWithCategory.interface";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";

const HomePage = () => {
  const {
    data: animals,
    loading,
    error,
  } = useFetch<IAnimalWithCategory[]>(
    `${import.meta.env.VITE_API_URL}/animals-with-categories`,
    "GET",
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <FirstSection animals={animals} />
      <SecondSection
        popularAnimals={animals.filter((animal) => animal.isPopular)}
      />
    </>
  );
};

export default HomePage;
