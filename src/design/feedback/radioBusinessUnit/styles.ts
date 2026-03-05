import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

interface IStyledImage {
  $isTablet: boolean;
}

const StyledRadioBusinessUnit = styled.label<IStyledImage>`
  & div {
    box-sizing: border-box;
    height: ${({ $isTablet }) => ($isTablet ? "58px" : "90px")};
    width: ${({ $isTablet }) => ($isTablet ? "100%" : "483px")};
    box-shadow: 0px 1px 0px 1px
      ${({ theme }) =>
        theme?.color?.surface?.gray?.regular ?? inube.palette.neutral.N30};
    border: 1px solid
      ${({ theme }) =>
        theme?.color?.surface?.gray?.regular ?? inube.palette.neutral.N30};
    cursor: pointer;
    border-radius: ${tokens.spacing.s100};
  }
`;

const StyledRadio = styled.input`
  width: 16px;
  height: 16px;
  &:checked ~ img {
    filter: grayscale(0%);
  }
`;

const StyledImage = styled.img<IStyledImage>`
  max-width: 180px;
  max-height: 80px;
  height: auto;
  transition: filter 500ms ease-out;
  filter: grayscale(100%);

  ${({ $isTablet }) =>
    $isTablet &&
    `
   display: none;
  `}
`;

export { StyledRadioBusinessUnit, StyledImage, StyledRadio };
