import { combineReducers, configureStore } from "@reduxjs/toolkit";
import animalReducer from "../features/animals/store/animal.slice";
import categoryReducer from "../features/categories/store/category.slice";
import animalWithCategoryReducer from "../features/animals-with-categories/store/animalWithCategory.slice";

const rootReducer = combineReducers({
  animal: animalReducer,
  category: categoryReducer,
  animal_with_category: animalWithCategoryReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
