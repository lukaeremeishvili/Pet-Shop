import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/index";
import { IAnimalWithCategory } from "../../../interfaces/animalWithCategory.interface";
import {
  getAnimalWithCategoryRequest,
  getAnimalsWithCategoryRequest,
  postAnimalWithCategoryRequest,
  editAnimalWithCategoryRequest,
  deleteAnimalWithCategoryRequest,
} from "./animalWithCategory.thunks";

interface IAnimalsWithCategoriesWithCategoryState {
  animalWithCategoryList: IAnimalWithCategory[];
  animalWithCategory: IAnimalWithCategory | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IAnimalsWithCategoriesWithCategoryState = {
  animalWithCategoryList: [],
  animalWithCategory: null,
  loading: false,
  error: null,
};

const animalWithCategorySlice = createSlice({
  name: "animal_with_category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnimalWithCategoryRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAnimalWithCategoryRequest.fulfilled,
        (
          state,
          { payload: animalWithCategory }: PayloadAction<IAnimalWithCategory>
        ) => {
          state.loading = false;
          state.error = null;
          state.animalWithCategory = animalWithCategory;
        }
      )
      .addCase(
        getAnimalWithCategoryRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(getAnimalsWithCategoryRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAnimalsWithCategoryRequest.fulfilled,
        (
          state,
          { payload: animalWithCategory }: PayloadAction<IAnimalWithCategory[]>
        ) => {
          state.loading = false;
          state.error = null;
          state.animalWithCategoryList = animalWithCategory;
        }
      )
      .addCase(
        getAnimalsWithCategoryRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(postAnimalWithCategoryRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postAnimalWithCategoryRequest.fulfilled,
        (
          state,
          { payload: animalWithCategory }: PayloadAction<IAnimalWithCategory>
        ) => {
          state.loading = false;
          state.error = null;
          state.animalWithCategoryList = [
            animalWithCategory,
            ...state.animalWithCategoryList,
          ];
        }
      )
      .addCase(
        postAnimalWithCategoryRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(editAnimalWithCategoryRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        editAnimalWithCategoryRequest.fulfilled,
        (
          state,
          {
            payload: updatedAnimalWithCategory,
          }: PayloadAction<IAnimalWithCategory>
        ) => {
          state.loading = false;
          state.error = null;
          state.animalWithCategoryList = state.animalWithCategoryList.map(
            (animalWithCategory) => {
              if (animalWithCategory._uuid !== updatedAnimalWithCategory._uuid)
                return animalWithCategory;
              return updatedAnimalWithCategory;
            }
          );
        }
      )
      .addCase(
        editAnimalWithCategoryRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(deleteAnimalWithCategoryRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteAnimalWithCategoryRequest.fulfilled,
        (
          state,
          {
            payload: deletedAnimalWithCategory,
          }: PayloadAction<IAnimalWithCategory>
        ) => {
          state.loading = false;
          state.error = null;
          state.animalWithCategoryList = state.animalWithCategoryList.filter(
            (animalWithCategory) =>
              animalWithCategory._uuid !== deletedAnimalWithCategory._uuid
          );
        }
      )
      .addCase(
        deleteAnimalWithCategoryRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );
  },
});

export const animalWithCategorySelector = (state: RootState) =>
  state.animal_with_category;
export default animalWithCategorySlice.reducer;
