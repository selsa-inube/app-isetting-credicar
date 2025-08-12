import styled from "styled-components";
import { tokens } from "@design/tokens";

interface IStyledContainerIcon {
  $isTablet?: boolean;
}

const StyledContainerIcon = styled.div<IStyledContainerIcon>`
  display: flex;
  cursor: pointer;
  justify-content: ${({ $isTablet }) => ($isTablet ? "start" : "center")};
  gap: ${tokens.spacing.s100};
  padding: ${({ $isTablet }) =>
    $isTablet
      ? `${tokens.spacing.s100} ${tokens.spacing.s050}`
      : `${tokens.spacing.s0}`};
`;

export { StyledContainerIcon };
