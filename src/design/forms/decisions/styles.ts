import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

interface IStyledContainer {
  $isMobile: boolean;
}

const StyledFormContent = styled.div`
  flex-grow: 1;
`;

const StyledContainer = styled.div<IStyledContainer>`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) =>
    ` 1px solid ${theme.palette.neutral.N40 ?? inube.palette.neutral.N40}`};
  border-radius: ${tokens.spacing.s100};
  width: auto;
  height: 50vh;
  padding: ${({ $isMobile }) =>
    $isMobile ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`};
  gap: ${tokens.spacing.s250};
`;

export { StyledContainer, StyledFormContent };
