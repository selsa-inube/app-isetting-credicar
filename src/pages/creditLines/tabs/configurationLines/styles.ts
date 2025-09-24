import styled from "styled-components";

const StyledDropdownMenuContainer = styled.div`
  position: fixed;
  z-index: 1;
  overflow: auto;
  width: 334px;
`;

const StyledFloatButtonsContainer = styled.div`
  position: sticky;
  bottom: 1rem;
  left: 50rem;
  margin-top: -58px;
`;

export { StyledDropdownMenuContainer, StyledFloatButtonsContainer };
