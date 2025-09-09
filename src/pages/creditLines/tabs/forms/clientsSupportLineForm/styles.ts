import { tokens } from "@design/tokens";
import styled from "styled-components";

const StyledContainerIcon = styled.div`
  display: flex;
  gap: ${tokens.spacing.s150};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  & > figure > svg {
    &:hover {
      color: ${({ theme }) => theme?.icon.primary.background.color.hover};
      border-color: ${({ theme }) =>
        theme?.icon.primary.background.color.hover};
    }
  }
`;

export { StyledContainerIcon };
