import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  width: 100%;

  && > fieldset {
    min-height: 308px;
    max-height: 546px;
  }
`;

export { StyledContainer };
