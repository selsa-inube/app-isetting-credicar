import styled from "styled-components";
import { tokensBoxContainer } from "./tokens";
import { IAppearenceBoxContainer } from "@ptypes/IAppearenceBoxContainer";

interface IStyledFlex {
  $boxSizing: string;
  $borderColor: IAppearenceBoxContainer;
  $backgroundColor: IAppearenceBoxContainer;
  $boxShadow: IAppearenceBoxContainer;
  $justifyContent?: string;
  $alignItems?: string;
  $alignContent?: string;
  $direction?: string;
  $wrap?: string;
  $height?: string;
  $width?: string;
  $gap?: string;
  $margin?: string;
  $padding?: string;
  $border?: string;
  $borderRadius?: string;
  $overflowY?: string;
  $overflowX?: string;
  $minHeight?: string;
  $maxHeight?: string;
}

const StyledFlex = styled.div<IStyledFlex>`
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  align-content: ${({ $alignContent }) => $alignContent};
  flex-direction: ${({ $direction }) => $direction};
  flex-wrap: ${({ $wrap }) => $wrap};
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  gap: ${({ $gap }) => $gap};
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};
  box-sizing: ${({ $boxSizing }) => $boxSizing};
  background: ${({ $backgroundColor, theme }) =>
    theme?.boxContainer?.[$backgroundColor].background?.color ??
    tokensBoxContainer[$backgroundColor].background.color};
  border: ${({ $borderColor, theme }) =>
    `1px solid ${theme?.boxContainer?.[$borderColor].border?.color ?? tokensBoxContainer[$borderColor].border.color}`};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  overflow-y: ${({ $overflowY }) => $overflowY};
  overflow-x: ${({ $overflowX }) => $overflowX};
  box-shadow: ${({ theme, $boxShadow }) =>
    `1px 1px 4px 2px ${theme?.boxContainer?.[$boxShadow].border?.color ?? tokensBoxContainer[$boxShadow].border.color}`};
  min-height: ${({ $minHeight }) => $minHeight};
  max-height: ${({ $maxHeight }) => $maxHeight};
`;

export { StyledFlex };
