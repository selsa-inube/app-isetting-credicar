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
  position: ${({ $maxAssistedScreenSize }) =>
    $maxAssistedScreenSize ? "static" : "fixed"};
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 2;
  width: ${({ $maxAssistedScreenSize }) =>
    $maxAssistedScreenSize ? "auto" : "19rem"};
  max-width: ${({ $maxAssistedScreenSize }) =>
    $maxAssistedScreenSize ? "none" : "unset"};
  margin-left: ${({ $maxAssistedScreenSize }) =>
    $maxAssistedScreenSize ? "auto" : "unset"};
`;

export { StyledDropdownMenuContainer, StyledFloatButtonsContainer };
