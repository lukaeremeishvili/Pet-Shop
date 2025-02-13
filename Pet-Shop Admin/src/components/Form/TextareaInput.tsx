import styled from "styled-components";
import { RefObject } from "react";

const StyledTextarea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  & > label {
    text-transform: capitalize;
  }

  & > textarea {
    all: unset;
    resize: none;
    color: #000000cc;
    height: 9.8rem;
    padding: 1rem;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
  }

  & > textarea::placeholder {
    text-transform: capitalize;
  }

  & > p {
    color: red;
  }

  & > p::first-letter {
    text-transform: capitalize;
  }
`;

interface ITextareaInput {
  name: string;
  textareaRef: RefObject<HTMLTextAreaElement>;
  defaultValue: string;
  error: string | null;
}

function TextareaInput({
  name,
  textareaRef,
  defaultValue = "",
  error,
}: ITextareaInput) {
  return (
    <StyledTextarea>
      <label htmlFor="description">{name}</label>
      <textarea
        id={name}
        name={name}
        placeholder={`enter ${name}`}
        defaultValue={defaultValue}
        ref={textareaRef}
      />
      {error && (
        <p>
          {name} {error}
        </p>
      )}
    </StyledTextarea>
  );
}

export default TextareaInput;
