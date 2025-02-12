import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import { animalWithCategorySelector } from "../store/animalWithCategory.slice";
import { FormEvent, useEffect, useState } from "react";
import {
  deleteAnimalWithCategoryRequest,
  editAnimalWithCategoryRequest,
  getAnimalWithCategoryRequest,
  postAnimalWithCategoryRequest,
} from "../store/animalWithCategory.thunks";
import {
  IAnimalWithCategory,
  IBaseAnimalWithCategory,
} from "../../../interfaces/animalWithCategory.interface";
import Form from "../../../components/Form";
import { animalSelector } from "../../animals/store/animal.slice";
import { categorySelector } from "../../categories/store/category.slice";
import { getAnimalsRequest } from "../../animals/store/animal.thunks";
import { getCategoriesRequest } from "../../categories/store/category.thunks";
import SelectorInput from "./SelectorInput";
import { IAnimal } from "../../../interfaces/animal.interface";
import { ICategory } from "../../../interfaces/category.interface";
import validateObject from "../../../validations/validateIsObject";
import styled from "styled-components";
import {
  loadingNotification,
  onResponseReturned,
} from "../../../utils/notifications";

const SyledSelectors = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

interface IForm {
  animalWithCategoryUuid: string | null;
}

function AnimalWithCategoryForm({ animalWithCategoryUuid }: IForm) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    animalList,
    loading: animalsLoading,
    error: animalsError,
  } = useAppSelector(animalSelector);
  const {
    categoryList,
    loading: categoriesLoading,
    error: categoriesError,
  } = useAppSelector(categorySelector);
  const {
    animalWithCategory,
    loading: animalsWithCategoryLoading,
    error: animalsWithCategoryError,
  } = useAppSelector(animalWithCategorySelector);

  const [selectedAnimal, setSelectedAnimal] = useState<null | IAnimal>(null);
  const [selectedCategory, setSelectedCategory] = useState<null | ICategory>(
    null
  );

  const [errors, setErrors] = useState<{
    animal: null | string;
    category: null | string;
  }>({
    animal: null,
    category: null,
  });

  useEffect(() => {
    dispatch(getAnimalsRequest());
    dispatch(getCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (animalWithCategoryUuid)
      dispatch(getAnimalWithCategoryRequest(animalWithCategoryUuid));
  }, [dispatch, animalWithCategoryUuid]);

  useEffect(() => {
    if (animalWithCategory && animalList.length && categoryList.length) {
      const foundAnimal = animalList.find(
        (animal) => animal._uuid === animalWithCategory.animal_uuid
      );
      const foundCategory = categoryList.find(
        (category) => category._uuid === animalWithCategory.category_uuid
      );

      setSelectedAnimal(foundAnimal ?? null);
      setSelectedCategory(foundCategory ?? null);
    }
  }, [animalWithCategory, animalList, categoryList]);

  const postAnimalWithCategory = async (
    AnimalWithCategory: IBaseAnimalWithCategory
  ) => {
    const loadingToastId = loadingNotification();
    const res = await dispatch(
      postAnimalWithCategoryRequest(AnimalWithCategory)
    );

    onResponseReturned(
      loadingToastId,
      () => navigate("/animals-with-categories"),
      typeof res.payload === "string" ? res.payload : null
    );
  };

  const editAnimalWithCategory = async (
    animalWithCategory: IAnimalWithCategory
  ) => {
    const loadingToastId = loadingNotification();
    const res = await dispatch(
      editAnimalWithCategoryRequest(animalWithCategory)
    );

    onResponseReturned(
      loadingToastId,
      () => navigate("/animals-with-categories"),
      typeof res.payload === "string" ? res.payload : null
    );
  };

  const onAnimalWithCategoryDelete = async (animalWithCategoryUuid: string) => {
    const loadingToastId = loadingNotification();
    const res = await dispatch(
      deleteAnimalWithCategoryRequest(animalWithCategoryUuid)
    );

    onResponseReturned(
      loadingToastId,
      () => navigate("/animals-with-categories"),
      typeof res.payload === "string" ? res.payload : null
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const animalErr = validateObject(selectedAnimal);
    const categoryErr = validateObject(selectedCategory);

    if (!selectedAnimal || !selectedCategory)
      return setErrors({
        animal: animalErr,
        category: categoryErr,
      });

    const newAnimalWithCategory = {
      animal_uuid: selectedAnimal._uuid,
      category_uuid: selectedCategory._uuid,
      name: selectedAnimal.name,
      animal_description: selectedAnimal.description,
      price: selectedAnimal.price,
      stock: selectedAnimal.stock,
      image: selectedAnimal.image,
      isPopular: selectedAnimal.isPopular,
      title: selectedCategory.title,
      category_description: selectedCategory.description,
    };

    if (!animalWithCategory) postAnimalWithCategory(newAnimalWithCategory);
    else
      editAnimalWithCategory({
        ...animalWithCategory,
        ...newAnimalWithCategory,
      });
  };

  return (
    <Form
      name="animal with category"
      itemUuid={animalWithCategoryUuid}
      loading={
        animalsLoading || categoriesLoading || animalsWithCategoryLoading
      }
      error={animalsError || categoriesError || animalsWithCategoryError}
      onDelete={onAnimalWithCategoryDelete}
      onSubmit={onSubmit}
    >
      <SyledSelectors>
        <SelectorInput
          name="animal"
          items={animalList}
          selectedItem={animalWithCategoryUuid ? selectedAnimal : null}
          onSelectItem={(selectedItem) =>
            setSelectedAnimal(selectedItem as IAnimal)
          }
          error={errors.animal}
        />
        <SelectorInput
          name="category"
          items={categoryList}
          selectedItem={animalWithCategoryUuid ? selectedCategory : null}
          onSelectItem={(selectedItem) =>
            setSelectedCategory(selectedItem as ICategory)
          }
          error={errors.category}
        />
      </SyledSelectors>
    </Form>
  );
}

export default AnimalWithCategoryForm;
