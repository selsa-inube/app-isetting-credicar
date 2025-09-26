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

export { StyledDropdownMenuContainer };
