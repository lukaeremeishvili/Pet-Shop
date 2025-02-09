import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/index";
import { IAnimal } from "../../../interfaces/animal.interface";
import {
  deleteAnimalRequest,
  editAnimalRequest,
  getAnimalRequest,
  getAnimalsRequest,
  postAnimalRequest,
} from "./animal.thunks";

interface IAnimalState {
  animalList: IAnimal[];
  animal: IAnimal | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IAnimalState = {
  animalList: [],
  animal: null,
  loading: false,
  error: null,
};

const animalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnimalRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAnimalRequest.fulfilled,
        (state, { payload: animal }: PayloadAction<IAnimal>) => {
          state.loading = false;
          state.error = null;
          state.animal = animal;
        }
      )
      .addCase(
        getAnimalRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(getAnimalsRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAnimalsRequest.fulfilled,
        (state, { payload: animals }: PayloadAction<IAnimal[]>) => {
          state.loading = false;
          state.error = null;
          state.animalList = animals;
        }
      )
      .addCase(
        getAnimalsRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(postAnimalRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postAnimalRequest.fulfilled,
        (state, { payload: animal }: PayloadAction<IAnimal>) => {
          state.loading = false;
          state.error = null;
          state.animalList = [animal, ...state.animalList];
        }
      )
      .addCase(
        postAnimalRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(editAnimalRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        editAnimalRequest.fulfilled,
        (state, { payload: updatedAnimal }: PayloadAction<IAnimal>) => {
          state.loading = false;
          state.error = null;
          state.animalList = state.animalList.map((animal) => {
            if (animal._uuid !== updatedAnimal._uuid) return animal;
            return updatedAnimal;
          });
        }
      )
      .addCase(
        editAnimalRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );

    builder
      .addCase(deleteAnimalRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteAnimalRequest.fulfilled,
        (state, { payload: deletedAnimal }: PayloadAction<IAnimal>) => {
          state.loading = false;
          state.error = null;
          state.animalList = state.animalList.filter(
            (animal) => animal._uuid !== deletedAnimal._uuid
          );
        }
      )
      .addCase(
        deleteAnimalRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );
  },
});

export const animalSelector = (state: RootState) => state.animal;
export default animalSlice.reducer;
