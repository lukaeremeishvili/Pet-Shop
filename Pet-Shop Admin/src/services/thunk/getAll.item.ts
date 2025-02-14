import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetAllResponse } from "../../interfaces/response.interface";

const apiKey = import.meta.env.VITE_CRUDAPI_API_KEY as string;
export const getAllItemRequest = <T extends object>(
  name: string,
  url: string
) =>
  createAsyncThunk<T[], void, { rejectValue: string }>(
    `/${name}/GET`,
    async (_, thunkApi) => {
      try {
        const res = await fetch(`${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!res.ok) throw new Error(`Failed to get ${name}!`);

        const data: IGetAllResponse<T> = await res.json();

        return data.items;
      } catch (err) {
        if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
        return thunkApi.rejectWithValue("Something went wrong!");
      }
    }
  );
