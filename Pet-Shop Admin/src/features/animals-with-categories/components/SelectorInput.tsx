import { useState } from "react";
import styled from "styled-components";
import { ICategory } from "../../../interfaces/category.interface";
import { IAnimal } from "../../../interfaces/animal.interface";

const StyledSelector = styled.div`
  & > label {
    text-transform: capitalize;
  }

  & > p {
    margin-bottom: 1rem;
    color: red;
  }

  & > p::first-letter {
    text-transform: capitalize;
  }

  .active {
    transform: rotate(-90deg) translateX(5px);
  }

  .selected {
    border-bottom: 2px solid #0c5200f9 !important;
  }
`;

const StyledDropdown = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  margin-bottom: 1rem;

  & > button {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: capitalize;
    background: none;
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
  }

  & > button > span {
    color: #3f3f3f;
  }
`;

const StyledContent = styled.div`
  width: 100%;
  position: absolute;
  top: 4.2rem;
  background-color: white;
  min-width: 10rem;
  box-shadow: 0 0.5rem 1rem #00000033;
  z-index: 1;
  overflow: hidden;
  height: 300px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color: #598fda62;
    border-radius: 10px;
    border: 1px solid #5151517e;

    &:hover {
      background-color: #598fdaa9;
    }
  }

  & div {
    cursor: pointer;
    display: block;
    color: #333;
    padding: 0.75rem 1rem;
    text-decoration: none;
    border-bottom: 2px solid #57575764;
    transition: background-color 0.3s;
  }

  & div:hover {
    background-color: #ddd;
  }
`;

interface ISelectedInput {
  name: string;
  items: ICategory[] | IAnimal[];
  selectedItem: ICategory | IAnimal | null;
  onSelectItem: (item: IAnimal | ICategory) => void;
  error: null | string;
}

function SelectorInput({
  name,
  items,
  selectedItem,
  onSelectItem,
  error,
}: ISelectedInput) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  function isCategory(item: ICategory | IAnimal): item is ICategory {
    return (item as ICategory).title !== undefined;
  }

  return (
    <StyledSelector>
      <label>{name}</label>
      <StyledDropdown>
        <button type="button" onClick={toggleDropdown}>
          {selectedItem
            ? isCategory(selectedItem)
              ? selectedItem.title
              : selectedItem.name
            : `choose ${name}`}
          <span className={`material-symbols-outlined ${isOpen && "active"}`}>
            arrow_back_ios
          </span>
        </button>
        {isOpen && (
          <StyledContent>
            {items.map((item) => (
              <div
                key={item._uuid}
                className={`${
                  selectedItem &&
                  selectedItem._uuid === item._uuid &&
                  "selected"
                }`}
                onClick={() => {
                  onSelectItem(item);
                  toggleDropdown();
                }}
              >
                {isCategory(item) ? item.title : item.name}
              </div>
            ))}
          </StyledContent>
        )}
      </StyledDropdown>
      {error && (
        <p>
          {name} {error}
        </p>
      )}
    </StyledSelector>
  );
}

export default SelectorInput;
