import { inube } from "@inubekit/inubekit";
import styled from "styled-components";

const StyledDropdownMenuContainer = styled.div`
  position: fixed;
  z-index: 1;
  overflow: auto;
  width: 334px;
  background: ${({ theme }) =>
    `${theme?.palette?.neutral?.N20 || inube.palette.neutral.N20}`};
`;

const StyledFloatButtonsContainer = styled.div`
  z-index: 2;
  position: sticky;
  bottom: 1rem;
  left: 50rem;
  margin-top: -58px;
`;

export { StyledDropdownMenuContainer, StyledFloatButtonsContainer };
