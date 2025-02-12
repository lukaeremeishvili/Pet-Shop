import {
  IAnimalWithCategory,
  IBaseAnimalWithCategory,
} from "../../../interfaces/animalWithCategory.interface";
import { BASE_URL, REQUEST } from "../../../apiConfig";
import { getItemRequest } from "../../../services/thunk/get.item";
import { getAllItemRequest } from "../../../services/thunk/getAll.item";
import { postItemRequest } from "../../../services/thunk/post.item";
import { putItemRequest } from "../../../services/thunk/put.item";
import { deleteItemRequest } from "../../../services/thunk/delete.item";

export const getAnimalWithCategoryRequest = getItemRequest<IAnimalWithCategory>(
  "animal-with-category",
  `${BASE_URL}/${REQUEST.animal_with_category}`
  
);

export const getAnimalsWithCategoryRequest =
  getAllItemRequest<IAnimalWithCategory>(
    "animals-with-category",
    `${BASE_URL}/${REQUEST.animal_with_category}`
  );

export const postAnimalWithCategoryRequest = postItemRequest<
  IAnimalWithCategory,
  IBaseAnimalWithCategory
>("animal-with-category", `${BASE_URL}/${REQUEST.animal_with_category}`);

export const editAnimalWithCategoryRequest =
  putItemRequest<IAnimalWithCategory>(
    "animal-with-category",
    `${BASE_URL}/${REQUEST.animal_with_category}`
  );

export const deleteAnimalWithCategoryRequest =
  deleteItemRequest<IAnimalWithCategory>(
    "animal-with-category",
    `${BASE_URL}/${REQUEST.animal_with_category}`
  );
