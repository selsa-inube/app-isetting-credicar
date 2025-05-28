import styled from "styled-components";

interface IStyledRow {
  $isMobile: boolean;
  $editOption: boolean;
}

const StyledFormContent = styled.div`
  flex-grow: 1;
`;

const StyledRow = styled.div<IStyledRow>`
  grid-column: ${({ $editOption, $isMobile }) =>
    $editOption ? ($isMobile ? "span 1" : "span 2") : ""};
  width: 100%;
`;

export { StyledFormContent, StyledRow };
