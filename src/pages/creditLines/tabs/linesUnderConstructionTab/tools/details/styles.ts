import styled from "styled-components";
import { tokens } from "@design/tokens";

interface IStyledContainerIcon {
  $isTablet?: boolean;
}

const StyledContainerIcon = styled.div<IStyledContainerIcon>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  gap: ${tokens.spacing.s100};
  padding: ${({ $isTablet }) =>
    $isTablet
      ? `${tokens.spacing.s100} ${tokens.spacing.s050}`
      : `${tokens.spacing.s0}`};
`;

export { StyledContainerIcon };
