import { IBaseResponse } from "./response.interface";

export interface IBaseAnimalWithCategory {
  animal_uuid: string;
  category_uuid: string;
}

export interface IAnimalWithCategory
  extends IBaseResponse,
    IBaseAnimalWithCategory {}
