import styled from "styled-components";

const StyledControl = styled.div`
  margin-left: auto;

  & > button {
    cursor: pointer;
    text-transform: capitalize;
    color: #ffffff;
    background-color: #1d69e4;
    margin-top: 4.5rem;
    padding: 0.9rem 4rem;
    border: none;
    border-radius: 0.5rem;
    transition: background-color 0.3s;
  }

  & > button:hover {
    background-color: #0062ff;
  }

  & > .delete-btn {
    margin-right: 2.2rem;
    background-color: #f52f2f !important;
  }

  & > .delete-btn {
    background-color: #ff0101 !important;
  }
`;

interface IControl {
  name: string;
  itemUuid: string | null;
  onDelete: (itemUuid: string) => void;
}

function Control({ name, itemUuid, onDelete }: IControl) {
  return (
    <StyledControl>
      {itemUuid && (
        <button
          onClick={() => onDelete(itemUuid)}
          className="delete-btn"
          type="button"
        >
          delete {name}
        </button>
      )}
      <button type="submit">
        {itemUuid ? "edit" : "add"} {name}
      </button>
    </StyledControl>
  );
}

export default Control;
