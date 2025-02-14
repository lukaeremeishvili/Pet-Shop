import { IBaseAnimal } from "./animal.interface";
import { IBaseCategory } from "./category.interface";
import { IBaseResponse } from "./response.interface";

export interface IBaseAnimalWithCategory
  extends Omit<IBaseAnimal, "description">,
    Omit<IBaseCategory, "description"> {
  animal_uuid: string;
  category_uuid: string;
  animal_description: string;
  category_description: string;
}

export interface IAnimalWithCategory
  extends IBaseResponse,
    IBaseAnimalWithCategory {}
