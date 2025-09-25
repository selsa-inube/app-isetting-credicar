import styled from "styled-components";
import { tokens } from "@design/tokens";

interface IStyledContainer {
  $multipleTables?: boolean;
  $pageLength?: number;
  $entriesLength?: number;
  $isTablet?: boolean;
}

const StyledContainerTable = styled.div<IStyledContainer>`
  position: relative;
  width: 100%;
  border-radius: 8px;

  td {
    padding: ${({ $isTablet }) =>
      $isTablet ? `${tokens.spacing.s100}` : `${tokens.spacing.s200}`};
  }

  & > td,
  & > div {
    justify-content: center;
  }

  ${({ $isTablet }) =>
    $isTablet &&
    `
    &: > td {
      justify-content: flex-start;
 
    }

    &: > div > div {
     overflow: auto;
  }
  `}
`;

const StyledTableOverflow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div {
    overflow: visible !important;
  }
`;
export { StyledContainerTable, StyledTableOverflow };
