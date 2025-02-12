import { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;

  & th {
    padding: 12px;
    text-align: left;
    border: 1px solid #ffffff;
    background-color: hsl(0, 0%, 100%);
    color: black;
    border-bottom: 2px solid #cccccc;
    font-size: 20px;
    font-weight: 500;
    padding-left: 24px;
    padding-right: 140px;
  }

  & td {
    padding: 12px;
    text-align: left;
    font-weight: 500;
    border: 1px solid #ffffff;
    padding-left: 24px;
  }

  & img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  & button {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    background: none;
    color: #598eda;
    border: none;

    &:hover {
      color: #076fff;
    }
  }
`;

function Table({ children }: PropsWithChildren) {
  return <StyledTable>{children}</StyledTable>;
}

export default Table;
