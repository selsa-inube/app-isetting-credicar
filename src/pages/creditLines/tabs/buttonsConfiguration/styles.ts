import { inube } from "@inubekit/inubekit";
import { IFloatButtonsContainer } from "@ptypes/creditLines/forms/IFloatButtonsContainer";
import styled from "styled-components";

const StyledDropdownMenuContainer = styled.div`
  position: fixed;
  overflow: auto;
  width: 334px;
  background: ${({ theme }) =>
    `${theme?.palette?.neutral?.N20 || inube.palette.neutral.N20}`};
  z-index: 1;
`;

const StyledFloatButtonsContainer = styled.div<IFloatButtonsContainer>`
  position: sticky;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 2;
  width: auto;
  max-width: none;
  margin-left: auto;
`;

export { StyledDropdownMenuContainer, StyledFloatButtonsContainer };
