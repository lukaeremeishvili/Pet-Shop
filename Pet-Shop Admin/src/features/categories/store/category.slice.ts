import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/index";
import { ICategory } from "../../../interfaces/category.interface";
import {
  getCategoryRequest,
  getCategoriesRequest,
  postCategoryRequest,
  editcategoryRequest,
  deletecategoryRequest,
} from "./category.thunks";

interface ICategoryState {
  categoryList: ICategory[];
  category: ICategory | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: ICategoryState = {
  categoryList: [],
  category: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCategoryRequest.fulfilled,
        (state, { payload: category }: PayloadAction<ICategory>) => {
          state.loading = false;
          state.error = null;
          state.category = category;
        }
      )
      .addCase(
        getCategoryRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(getCategoriesRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCategoriesRequest.fulfilled,
        (state, { payload: categories }: PayloadAction<ICategory[]>) => {
          state.loading = false;
          state.error = null;
          state.categoryList = categories;
        }
      )
      .addCase(
        getCategoriesRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(postCategoryRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postCategoryRequest.fulfilled,
        (state, { payload: category }: PayloadAction<ICategory>) => {
          state.loading = false;
          state.error = null;
          state.categoryList = [category, ...state.categoryList];
        }
      )
      .addCase(
        postCategoryRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(editcategoryRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        editcategoryRequest.fulfilled,
        (state, { payload: updatedCategory }: PayloadAction<ICategory>) => {
          state.loading = false;
          state.error = null;
          state.categoryList = state.categoryList.map((category) => {
            if (category._uuid !== updatedCategory._uuid) return category;
            return updatedCategory;
          });
        }
      )
      .addCase(
        editcategoryRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(deletecategoryRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deletecategoryRequest.fulfilled,
        (state, { payload: deletedCategory }: PayloadAction<ICategory>) => {
          state.loading = false;
          state.error = null;
          state.categoryList = state.categoryList.filter(
            (category) => category._uuid !== deletedCategory._uuid
          );
        }
      )
      .addCase(
        deletecategoryRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );
  },
});

export const categorySelector = (state: RootState) => state.category;
export default categorySlice.reducer;
