import "./Keyframes/keyframes.css";
import styled from "styled-components";

const StyledSpinner = styled.div`
  margin-top: 6dvh;
  width: 100%;
  display: flex;
  justify-content: center;

  & > div {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #4f4f4f;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    animation: spin 1.5s linear infinite;
  }
`;

function Spinner() {
  return (
    <StyledSpinner>
      <div></div>
    </StyledSpinner>
  );
}

export default Spinner;
