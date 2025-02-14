import { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledPageContainer = styled.main`
  width: 100dvw;
  min-height: 100dvh;
  padding: 2.5rem;
  background-color: #f1f1f1;
`;

function PageContainer({ children }: PropsWithChildren) {
  return <StyledPageContainer>{children}</StyledPageContainer>;
}

export default PageContainer;
