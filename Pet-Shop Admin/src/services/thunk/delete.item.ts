import { createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = import.meta.env.VITE_CRUDAPI_API_KEY as string;

export const deleteItemRequest = <T extends object>(
  name: string,
  url: string
) =>
  createAsyncThunk<T, string, { rejectValue: string }>(
    `/${name}/DELETE`,
    async (uuid, thunkApi) => {
      try {
        const res = await fetch(`${url}/${uuid}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!res.ok) throw new Error(`Failed to delete ${name}!`);

        const data: T = await res.json();

        return data;
      } catch (err) {
        if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
        return thunkApi.rejectWithValue("Something went wrong!");
      }
    }
  );
