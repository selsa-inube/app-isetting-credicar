import styled from "styled-components";
interface IStyledModalContainer {
  changeZIndex: boolean;
}

const StyledModalContainer = styled.div<IStyledModalContainer>`
  & > div {
    z-index: ${({ changeZIndex }) => (changeZIndex ? 3 : 1)};
  }
`;

export { StyledModalContainer };
