import { inube } from "@inubekit/inubekit";
import styled from "styled-components";

const StyledDropdownMenuContainer = styled.div`
  position: fixed;
  z-index: 1;
  overflow: auto;
  width: 334px;
  background: ${({ theme }) =>
    `${theme?.palette?.neutral?.N20 || inube.palette.neutral.N20}`};

  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      `${theme?.palette?.neutral?.N80 || inube.palette.neutral.N80}`};
    border-radius: 8px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &:hover::-webkit-scrollbar,
  &:hover::-webkit-scrollbar-thumb {
    opacity: 1;
    pointer-events: auto;
  }
`;

export { StyledDropdownMenuContainer };
