import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

const StyledContainerName = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${inube.palette.neutral.N0};
  width: 672px;
  height: 52px;
  border-radius: ${tokens.spacing.s100};
  padding: ${tokens.spacing.s075} ${tokens.spacing.s200};
  gap: ${tokens.spacing.s050};
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    theme ? `${theme.palette.neutral.N10}` : `${inube.palette.neutral.N10}`};
`;

const StyledContainerDescription = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${inube.palette.neutral.N0};
  width: 672px;
  height: 288px;
  border-radius: ${tokens.spacing.s100};
  padding: ${tokens.spacing.s075} ${tokens.spacing.s200};
  gap: ${tokens.spacing.s050};
  box-sizing: border-box;
  background-color: ${inube.palette.neutral.N10};

  & p {
    white-space: keep-all;
  }
`;

export { StyledContainerName, StyledContainerDescription };
