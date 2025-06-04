import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";

interface IStyledContainerFields {
  $isMobile: boolean;
}

interface IStyledIcon {
  $isMobile: boolean;
}

const StyledContainer = styled.div<IStyledIcon>`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.s300};
  min-height: ${({ $isMobile }) => ($isMobile ? "60vh" : "50vh")};
`;

const StyledFormContent = styled.div`
  flex-grow: 1;
`;

const StyledContainerFields = styled.div<IStyledContainerFields>`
  border: ${({ theme }) =>
    ` 1px solid ${theme.palette.neutral.N40 ?? inube.palette.neutral.N40}`};
  border-radius: ${tokens.spacing.s100};
  width: auto;
  gap: ${tokens.spacing.s300};
  padding: ${({ $isMobile }) =>
    $isMobile ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`};
`;

const StyledIcon = styled.div<IStyledIcon>`
  display: flex;
  justify-content: center;
  border: ${({ theme }) =>
    ` 1px solid ${theme.palette.neutral.N40 ?? inube.palette.neutral.N40}`};
  border-radius: ${tokens.spacing.s100};
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "56px")};
  height: 40px;
  padding: ${tokens.spacing.s100};
  box-sizing: border-box;
`;

export {
  StyledContainer,
  StyledFormContent,
  StyledIcon,
  StyledContainerFields,
};
