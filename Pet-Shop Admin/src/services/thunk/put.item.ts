import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWithUuid } from "../../interfaces/response.interface";

const apiKey = import.meta.env.VITE_CRUDAPI_API_KEY as string;

export const putItemRequest = <T extends IWithUuid>(
  name: string,
  url: string
) =>
  createAsyncThunk<T, T, { rejectValue: string }>(
    `/${name}/PUT`,
    async (item, thunkApi) => {
      try {
        const res = await fetch(`${url}/${item._uuid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(item),
        });

        if (!res.ok) throw new Error(`Failed to update ${name}!`);

        const data: T = await res.json();

        return data;
      } catch (err) {
        if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
        return thunkApi.rejectWithValue("Something went wrong!");
      }
    }
  );
