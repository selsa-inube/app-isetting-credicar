import styled from "styled-components";
import { Link } from "react-router-dom";
import { tokens } from "@design/tokens";
import { tokensAppCard } from "./tokens";

interface IStyledAppCard {
  $isMobile: boolean;
}

const StyledAppCard = styled(Link)<IStyledAppCard>`
  box-sizing: border-box;
  padding: ${`${tokens.spacing.s150} ${tokens.spacing.s300}`};
  height: 130px;
  width: ${({ $isMobile }) => ($isMobile ? "296px" : "305px")};
  min-height: ${({ $isMobile }) => $isMobile && "100px"};
  gap: ${tokens.spacing.s150};
  display: flex;
  flex-direction: column;
  border-radius: ${tokens.spacing.s100};
  text-decoration: none;
  background-color: ${({ theme }) =>
    theme?.appCard.background.color.regular ??
    tokensAppCard.background.color.regular};
  box-shadow: 1px 1px 4px 3px
    ${({ theme }) =>
      theme?.appCard.boxShadow.color.regular ??
      tokensAppCard.boxShadow.color.regular};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) =>
      theme?.appCard.background.color.hover ??
      tokensAppCard.background.color.hover};
    box-shadow: none;
  }
  ${({ $isMobile }) =>
    $isMobile &&
    `
     div {
      gap: ${tokens.spacing.s050};
    }
  `}
`;

export { StyledAppCard };
