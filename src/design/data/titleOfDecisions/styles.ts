import styled from "styled-components";
import { tokens } from "@design/tokens";

const StyledContainerText = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  height: auto;
  gap: ${tokens.spacing.s100};

  & > p {
    word-break: keep-all;
    white-space: normal;
  }
`;

export { StyledContainerText };
