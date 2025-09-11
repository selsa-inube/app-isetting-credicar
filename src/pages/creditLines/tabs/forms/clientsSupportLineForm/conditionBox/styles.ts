import { tokens } from "@design/tokens";
import styled from "styled-components";

interface IStyledContainer {
  $isSelected: boolean;
}

const StyledContainer = styled.div<IStyledContainer>`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme?.BoxContainer.light.background.color};
  border-radius: ${tokens.spacing.s100};
  border: ${({ $isSelected, theme }) =>
    `1px solid ${$isSelected ? theme.BoxContainer.primary.border.color : theme.BoxContainer.dark.border.color} `};
  padding: ${tokens.spacing.s075} ${tokens.spacing.s150};
  box-sizing: border-box;
`;

export { StyledContainer };
