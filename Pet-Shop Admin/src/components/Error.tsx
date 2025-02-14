import styled from "styled-components";

const StyledError = styled.div`
  margin-top: 10dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #ed0000cc;
`;

interface IError {
  text: string;
}

function Error({ text }: IError) {
  return (
    <StyledError>
      <h1>{text}</h1>
    </StyledError>
  );
}

export default Error;
