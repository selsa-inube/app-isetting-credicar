import styled from "styled-components";
import { tokens } from "@design/tokens";

interface IStyledSelectContainer {
  $isMobile: boolean;
}

const StyledSelectContainer = styled.div<IStyledSelectContainer>`
  height: ${({ $isMobile }) =>
    $isMobile ? `${tokens.spacing.s650}` : `${tokens.spacing.s600}`};
  & > div > div > input {
    width: 100%;
  }
`;

export { StyledSelectContainer };
