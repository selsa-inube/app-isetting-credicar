import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

interface IStyledModal {
  $smallScreen: boolean;
}

interface IStyledTextarea {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  background-color: ${inube.palette.neutral.N0};
  width: ${(props) => (props.$smallScreen ? "300px" : "720px")};
  height: "auto";
  border-radius: ${tokens.spacing.s100};
  padding: ${(props) =>
    props.$smallScreen ? `${tokens.spacing.s200}` : `${tokens.spacing.s300}`};
  gap: ${tokens.spacing.s300};
  box-sizing: border-box;
`;

const StyledContainerButton = styled.div`
  & button {
    display: flex;
    padding-right: ${tokens.spacing.s0};
    justify-content: flex-end;
  }
`;

const StyledTextarea = styled.div<IStyledTextarea>`
  textarea {
    font-size: 14px;
  }

  ${({ $smallScreen }) =>
    $smallScreen &&
    `
    div {
      display: inline;
    }

    div:nth-child(2) p {
      text-align: right;
    }

    & p {
      white-space: normal;
      margin: 0px;
    }
  `}
`;

export { StyledModal, StyledContainerButton, StyledTextarea };
