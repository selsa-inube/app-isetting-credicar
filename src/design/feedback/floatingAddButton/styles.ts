import styled from "styled-components";

interface IStyledFloatingButton {
  $bottom: string;
  $right: string;
}

const StyledFloatingButton = styled.div<IStyledFloatingButton>`
  position: fixed;
  bottom: ${({ $bottom }) => $bottom};
  right: ${({ $right }) => $right};
  cursor: pointer;
`;

export { StyledFloatingButton };
