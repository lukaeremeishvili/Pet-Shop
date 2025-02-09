import {
  IBaseCategory,
  ICategory,
} from "../../../interfaces/category.interface";
import { BASE_URL, REQUEST } from "../../../apiConfig";
import { getItemRequest } from "../../../services/thunk/get.item";
import { getAllItemRequest } from "../../../services/thunk/getAll.item";
import { postItemRequest } from "../../../services/thunk/post.item";
import { putItemRequest } from "../../../services/thunk/put.item";
import { deleteItemRequest } from "../../../services/thunk/delete.item";

export const getCategoryRequest = getItemRequest<ICategory>(
  "category",
  `${BASE_URL}/${REQUEST.category}`
);

export const getCategoriesRequest = getAllItemRequest<ICategory>(
  "categories",
  `${BASE_URL}/${REQUEST.category}`
);

export const postCategoryRequest = postItemRequest<ICategory, IBaseCategory>(
  "category",
  `${BASE_URL}/${REQUEST.category}`
);

export const editcategoryRequest = putItemRequest<ICategory>(
  "category",
  `${BASE_URL}/${REQUEST.category}`
);

export const deletecategoryRequest = deleteItemRequest<ICategory>(
  "category",
  `${BASE_URL}/${REQUEST.category}`
);
