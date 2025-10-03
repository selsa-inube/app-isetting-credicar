import styled from "styled-components";
import { tokens } from "@design/tokens";

interface IStyledContainerIcon {
  $isTablet?: boolean;
}

const StyledContainerIcon = styled.div<IStyledContainerIcon>`
  display: flex;
  justify-content: center;
  cursor: pointer;
  gap: ${tokens.spacing.s100};
  padding: ${({ $isTablet }) =>
    $isTablet
      ? `${tokens.spacing.s100} ${tokens.spacing.s050}`
      : `${tokens.spacing.s0}`};
`;

export { StyledContainerIcon };
