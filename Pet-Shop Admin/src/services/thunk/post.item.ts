import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetAllResponse } from "../../interfaces/response.interface";

const apiKey = import.meta.env.VITE_CRUDAPI_API_KEY as string;

export const postItemRequest = <T extends object, U extends object>(
  name: string,
  url: string
) =>
  createAsyncThunk<T, U, { rejectValue: string }>(
    `/${name}/POST`,
    async (item, thunkApi) => {
      try {
        const res = await fetch(`${url}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify([item]),
        });

        if (!res.ok) throw new Error(`Failed to post ${name}!`);

        const data: IGetAllResponse<T> = await res.json();

        return data.items[0];
      } catch (err) {
        if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
        return thunkApi.rejectWithValue("Something went wrong!");
      }
    }
  );
