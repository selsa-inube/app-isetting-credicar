import { Link } from "react-router-dom";
import styled from "styled-components";

interface IStyledCollapseIcon {
  $collapse: boolean;
  $isTablet: boolean;
}

const StyledAppPage = styled.div`
  display: inherit;
  box-sizing: border-box;
`;

const StyledContainer = styled.div`
  display: inherit;
  overflow: hidden;

  & > p {
    white-space: nowrap;
  }
`;

interface IStyledMain {
  $isMobile: boolean;
}

const StyledMain = styled.main<IStyledMain>`
  box-sizing: border-box;
  height: calc(100vh - 54px);
  overflow-y: auto;
`;

const StyledHeaderContainer = styled.div`
  position: relative;
`;
const StyledContentImg = styled(Link)`
  width: 100px;
`;

const StyledLogo = styled.img`
  max-width: 100px;
`;

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  position: absolute;
  top: 13.5px;
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(-90deg)" : "rotate(90deg)"};
  left: ${({ $isTablet }) => ($isTablet ? "150px" : "142px")};
`;

const StyledCollapse = styled.div`
  position: absolute;
  margin-top: 55px;
`;

export {
  StyledAppPage,
  StyledContainer,
  StyledHeaderContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledCollapseIcon,
  StyledCollapse,
};
