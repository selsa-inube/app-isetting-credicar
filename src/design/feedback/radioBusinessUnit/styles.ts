import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

interface IStyledImage {
  $isTablet: boolean;
}

const StyledRadioBusinessUnit = styled.label<IStyledImage>`
  & div {
    box-sizing: border-box;
    height: ${({ $isTablet }) => ($isTablet ? "58px" : "72px")};
    width: ${({ $isTablet }) => ($isTablet ? "100%" : "483px")};
    box-shadow: 0px 1px 0px 1px
      ${({ theme }) =>
        theme?.color?.surface?.gray?.regular ?? inube.palette.neutral.N40};
    border: 1px solid
      ${({ theme }) =>
        theme?.color?.surface?.gray?.regular ?? inube.palette.neutral.N40};
    cursor: pointer;
    border-radius: ${tokens.spacing.s100};
  }
`;

const StyledRadio = styled.input`
  width: 14px;
  height: 14px;
  &:checked ~ img {
    filter: grayscale(0%);
  }
`;

const StyledImage = styled.img<IStyledImage>`
  max-width: 130px;
  max-height: 45px;
  object-fit: contain;
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
