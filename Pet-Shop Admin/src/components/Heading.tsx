import styled from "styled-components";

const StyledHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const StyledTitle = styled.h1`
  text-transform: capitalize;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const StyledAddButton = styled.button`
  text-transform: capitalize;
  padding: 10px 20px;
  background-color: #1d69e4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0062ff;
  }
`;

interface IHeading {
  title: string;
  onAdd: () => void;
}

function Heading({ title, onAdd }: IHeading) {
  return (
    <StyledHeading>
      <StyledTitle>{title}s</StyledTitle>
      <StyledAddButton onClick={onAdd}>Add {title}</StyledAddButton>
    </StyledHeading>
  );
}

export default Heading;
