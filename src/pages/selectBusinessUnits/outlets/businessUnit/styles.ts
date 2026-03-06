import styled from "styled-components";
import { tokens } from "@design/tokens";

interface IStyledBusinessUnitsList {
  $isMobile: boolean;
  $isTablet: boolean;
  $scroll?: boolean;
}

interface IStyledBusinessUnits {
  $isMobile: boolean;
}

const StyledBusinessUnits = styled.div<IStyledBusinessUnits>`
  & form {
    & > div {
      margin: ${tokens.spacing.s500} auto ${tokens.spacing.s0};
      width: ${({ $isMobile }) => ($isMobile ? "auto" : "500px")};
    }
  }

  & button {
    margin-top: ${tokens.spacing.s300};
  }
`;

const StyledBusinessUnitsList = styled.div<IStyledBusinessUnitsList>`
  & > div {
    list-style: none;
    max-height: 310px;
    min-height: ${({ $isTablet }) => $isTablet && "200px"};
    width: ${({ $isMobile }) => ($isMobile ? "300px" : "500px")};
    overflow-y: auto;
    gap: ${tokens.spacing.s200};
  }
`;

const StyledNoResults = styled.div`
  margin: ${tokens.spacing.s200} ${tokens.spacing.s0};
`;

const StyledBusinessUnitsItem = styled.li`
  width: 100%;
`;

export {
  StyledBusinessUnits,
  StyledBusinessUnitsList,
  StyledNoResults,
  StyledBusinessUnitsItem,
};
