import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${tokens.spacing.s0} ${tokens.spacing.s050} ${tokens.spacing.s0}
    ${tokens.spacing.s025};
  gap: ${tokens.spacing.s100};
  border-radius: ${tokens.spacing.s050};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral.N30 ?? inube.palette.neutral.N30};
  cursor: pointer;
`;

export { StyledContainer };
