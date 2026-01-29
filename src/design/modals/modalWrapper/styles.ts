import styled from "styled-components";
interface IStyledModalContainer {
  changeZIndex: boolean;
  valueZIndex?: number;
}

const StyledModalContainer = styled.div<IStyledModalContainer>`
  & > div {
    z-index: ${({ changeZIndex, valueZIndex }) =>
      changeZIndex ? (valueZIndex ?? 3) : 1};
  }
`;

export { StyledModalContainer };
