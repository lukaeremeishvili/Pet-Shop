import { FormEvent, ReactNode } from "react";
import styled from "styled-components";
import Control from "./Control";
import Spinner from "./Spinner";

const StyledForm = styled.form`
  min-height: 80dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 4.4rem;
`;

interface IForm {
  name: string;
  itemUuid: string | null;
  loading: boolean;
  error: string | null | undefined;
  onDelete: (uuid: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

function Form({
  name,
  itemUuid,
  loading,
  onDelete,
  onSubmit,
  children,
}: IForm) {
  if (loading) return <Spinner />;

  return (
    <StyledForm onSubmit={onSubmit}>
      {children}
      <Control itemUuid={itemUuid} onDelete={onDelete} name={name} />
    </StyledForm>
  );
}

export default Form;
