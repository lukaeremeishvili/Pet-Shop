import { IAnimal, IBaseAnimal } from "../../../interfaces/animal.interface";
import { BASE_URL, REQUEST } from "../../../apiConfig";
import { deleteItemRequest } from "../../../services/thunk/delete.item";
import { putItemRequest } from "../../../services/thunk/put.item";
import { postItemRequest } from "../../../services/thunk/post.item";
import { getAllItemRequest } from "../../../services/thunk/getAll.item";
import { getItemRequest } from "../../../services/thunk/get.item";

export const getAnimalRequest = getItemRequest<IAnimal>(
  "animal",
  `${BASE_URL}/${REQUEST.animal}`
);

export const getAnimalsRequest = getAllItemRequest<IAnimal>(
  "animals",
  `${BASE_URL}/${REQUEST.animal}`
);

export const postAnimalRequest = postItemRequest<IAnimal, IBaseAnimal>(
  "animal",
  `${BASE_URL}/${REQUEST.animal}`
);

export const editAnimalRequest = putItemRequest<IAnimal>(
  "animal",
  `${BASE_URL}/${REQUEST.animal}`
);

export const deleteAnimalRequest = deleteItemRequest<IAnimal>(
  "animal",
  `${BASE_URL}/${REQUEST.animal}`
);
