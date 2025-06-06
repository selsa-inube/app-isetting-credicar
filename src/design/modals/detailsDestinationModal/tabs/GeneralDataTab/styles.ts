import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

interface IStyledContainerName {
  $smallScreen: boolean;
}

const StyledContainerName = styled.div<IStyledContainerName>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme ? `${theme.palette.neutral.N0}` : `${inube.palette.neutral.N0}`};
  width: ${(props) => (props.$smallScreen ? "270px" : "672px")};
  height: 52px;
  border-radius: ${tokens.spacing.s100};
  padding: ${(props) =>
    props.$smallScreen
      ? `${tokens.spacing.s075}`
      : `${tokens.spacing.s075} ${tokens.spacing.s200}`};
  gap: ${tokens.spacing.s050};
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    theme ? `${theme.palette.neutral.N10}` : `${inube.palette.neutral.N10}`};
`;

const StyledContainerDescription = styled.div<IStyledContainerName>`
  display: flex;
  flex-direction: column;
  background-color: ${inube.palette.neutral.N0};
  width: ${(props) => (props.$smallScreen ? "270px" : "672px")};
  height: ${(props) => (props.$smallScreen ? "260px" : "288px")};
  border-radius: ${tokens.spacing.s100};
  padding: ${tokens.spacing.s075} ${tokens.spacing.s200};
  gap: ${tokens.spacing.s050};
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    theme ? `${theme.palette.neutral.N10}` : `${inube.palette.neutral.N10}`};

  & p {
    white-space: keep-all;
  }
`;

const StyledContainerDataName = styled.div`
  & p {
    font-size: 14px;
    color: ${({ theme }) =>
      theme
        ? `${theme.palette.neutral.N300}`
        : `${inube.palette.neutral.N300}`};
  }
`;

export {
  StyledContainerName,
  StyledContainerDescription,
  StyledContainerDataName,
};
