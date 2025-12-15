import styled from "styled-components";

interface IStyledActionModal {
  top: number;
  left: number;
}

const StyledContainerIcon = styled.div`
  transform: rotate(90deg);
`;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  width: 100%;
  justify-content: center;
`;

const StyledActionModal = styled.div<IStyledActionModal>`
  position: fixed;
  z-index: 1;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
`;

export { StyledActionModal, StyledContainerIcon, StyledContainer };
