import { inube } from "@inubekit/inubekit";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { tokens } from "@design/tokens";

interface IStyledCollapseIcon {
  $collapse: boolean;
  $isTablet: boolean;
}

interface IStyledContainerSection {
  $isMobile: boolean;
}

interface IStyledTitle {
  $isTablet: boolean;
}
interface IStyledContainerCards {
  $isTablet: boolean;
}
interface IStyledFooter {
  $isMobile: boolean;
}

const StyledContainerPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  margin: auto;
  max-width: 1440px;
  outline: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 ?? inube.palette.neutral.N40};
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: auto;
`;
const StyledContainerSection = styled.div<IStyledContainerSection>`
  display: flex;
  flex-direction: column;
  padding: ${({ $isMobile }) =>
    $isMobile ? `${tokens.spacing.s200}` : `${tokens.spacing.s0}`};
  gap: ${({ $isMobile }) =>
    $isMobile ? `${tokens.spacing.s300}` : `${tokens.spacing.s0}`};
`;

const StyledHeaderContainer = styled.div`
  position: relative;
  & div > div {
    cursor: pointer;
  }
`;

const StyledContentImg = styled(Link)`
  width: 100px;
`;

const StyledLogo = styled.img`
  max-width: 100px;
  max-height: 32px;
  height: auto;
`;

const StyledTitle = styled.div<IStyledTitle>`
  padding: ${({ $isTablet }) =>
    $isTablet
      ? `var(--spacing-S200, ${tokens.spacing.s200})`
      : `${tokens.spacing.s400} ${tokens.spacing.s0} ${tokens.spacing.s200}`};
  display: flex;
  flex-direction: column;
  align-items: ${({ $isTablet }) => $isTablet && "flex-start"};
  gap: ${({ $isTablet }) =>
    $isTablet
      ? `var(--spacing-S300, ${tokens.spacing.s300})`
      : `${tokens.spacing.s0}`};
  align-self: ${({ $isTablet }) => $isTablet && "stretch"};
`;

const StyledContainerCards = styled.div<IStyledContainerCards>`
  display: flex;
  box-sizing: border-box;
  justify-content: ${({ $isTablet }) => ($isTablet ? "center" : "flex-start")};
  flex-wrap: wrap;
  gap: ${tokens.spacing.s400};
`;

const StyledFooter = styled.footer<IStyledFooter>`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${tokens.spacing.s100} ${tokens.spacing.s200};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  box-sizing: border-box;
  margin-top: auto;
`;

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  position: absolute;
  top: ${({ $isTablet }) => ($isTablet ? "15px" : "13px")};
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(-90deg)" : "rotate(90deg)"};
  margin-left: 110px;
  z-index: 3;
`;

const StyledCollapse = styled.div`
  position: absolute;
  margin-top: 10px;
  z-index: 1;
`;

export {
  StyledContainer,
  StyledHeaderContainer,
  StyledTitle,
  StyledContentImg,
  StyledLogo,
  StyledContainerCards,
  StyledFooter,
  StyledContainerSection,
  StyledCollapseIcon,
  StyledCollapse,
  StyledContainerPage,
};
