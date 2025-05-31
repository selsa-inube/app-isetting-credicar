import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

const StyledConatinerAttribute = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${tokens.spacing.s100};
  width: 100%;
  min-height: 52px;
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray.clear ?? inube.palette.neutral.N10};
`;

const StyledAttribute = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${tokens.spacing.s050};
  padding: ${tokens.spacing.s075} ${tokens.spacing.s200};
  box-sizing: border-box;
`;

export { StyledConatinerAttribute, StyledAttribute };
