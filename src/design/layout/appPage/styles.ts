import { inube } from "@inubekit/inubekit";
import styled from "styled-components";

interface IStyledCollapseIcon {
  $collapse: boolean;
  $isTablet: boolean;
}

const StyledAppPage = styled.div`
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
  display: inherit;
  overflow: hidden;
  width: 100%;

  & > p {
    white-space: nowrap;
  }
`;

interface IStyledMain {
  $isMobile: boolean;
  $maxWidthPage: string;
  $fullWidth: boolean;
}

const StyledMain = styled.main<IStyledMain>`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  max-width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "1192px")};
  height: calc(100vh - 54px);
  overflow-y: auto;

  & > div {
    height: 100%;
    max-width: ${({ $maxWidthPage }) => $maxWidthPage};
  }

  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      `${theme?.palette?.neutral?.N80 || inube.palette.neutral.N80}`};
    border-radius: 8px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &:hover::-webkit-scrollbar,
  &:hover::-webkit-scrollbar-thumb {
    opacity: 1;
    pointer-events: auto;
  }
`;

const StyledHeaderContainer = styled.div`
  position: relative;
  & div > div {
    cursor: pointer;
  }
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
  margin-top: 55px;
  z-index: 1;
`;

export {
  StyledAppPage,
  StyledContainer,
  StyledHeaderContainer,
  StyledMain,
  StyledCollapseIcon,
  StyledCollapse,
};
