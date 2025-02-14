import { IBaseResponse } from "./response.interface";

export interface IBaseAnimal {
  name: string;
  price: number;
  description: string;
  isPopular: boolean;
  stock: number;
  image: string;
}

export interface IAnimal extends IBaseResponse, IBaseAnimal {}
