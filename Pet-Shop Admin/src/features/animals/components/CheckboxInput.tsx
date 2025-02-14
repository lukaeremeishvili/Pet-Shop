import styled from "styled-components";

const StyledCheckboxInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 0.6rem 0.5rem;
  gap: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #cccccc;

  & > label {
    text-transform: capitalize;
  }

  & > input {
    cursor: pointer;
    width: 1.6rem;
    height: 1.6rem;
  }
`;

interface ICheckboxInput {
  name: string;
  checked: boolean;
  onChange: () => void;
}

function CheckboxInput({ name, checked, onChange }: ICheckboxInput) {
  return (
    <StyledCheckboxInput>
      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </StyledCheckboxInput>
  );
}

export default CheckboxInput;
