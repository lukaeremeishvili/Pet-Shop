import { RefObject } from "react";
import styled from "styled-components";

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  & > label {
    text-transform: capitalize;
  }

  & > input {
    padding: 1rem;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
  }

  & > input::placeholder {
    text-transform: capitalize;
  }

  & > p {
    color: red;
  }

  & > p::first-letter {
    text-transform: capitalize;
  }
`;

interface IInput {
  name: string;
  type?: string;
  inputRef: RefObject<HTMLInputElement>;
  defaultValue: string;
  error: string | null;
}

function Input({ name, type = "text", inputRef, defaultValue, error }: IInput) {
  return (
    <StyledInput>
      <label htmlFor={name}>{name}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={`enter ${name}`}
        ref={inputRef}
        defaultValue={defaultValue}
        step="any"
      />
      {error && (
        <p>
          {name} {error}
        </p>
      )}
    </StyledInput>
  );
}

export default Input;
