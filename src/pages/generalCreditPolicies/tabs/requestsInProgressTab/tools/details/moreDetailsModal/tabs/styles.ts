import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  height: 300px;

  & > div > div > div > div {
    width: 100%;
    height: 340px;
    max-height: 340px;
  }
`;

export { StyledContainer };
