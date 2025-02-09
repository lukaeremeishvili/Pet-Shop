import { IBaseResponse } from "./response.interface";

export interface IBaseCategory {
  title: string;
  description: string;
}

export interface ICategory extends IBaseResponse, IBaseCategory {}
