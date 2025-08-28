import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

const StyledContainer = styled.div`
  box-shadow: 2px 2px 3px 2px
    ${({ theme }) => theme?.palette?.neutral?.N30 ?? inube.palette.neutral.N30};
  border-radius: ${tokens.spacing.s100};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 ?? inube.palette.neutral.N0};
  margin-left: 10px;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: ${tokens.spacing.s0};
  padding: ${tokens.spacing.s0} ${tokens.spacing.s025} ${tokens.spacing.s0}
    ${tokens.spacing.s025};
`;

const StyledLi = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  &:hover {
    background-color: ${inube.palette.neutral.N30};
    border-radius: ${tokens.spacing.s100};
  }
`;

const StyledContainerOption = styled.div`
  cursor: pointer;
`;

const StyledImg = styled.img`
  position: relative;
  width: 75px;
  height: auto;
  left: 5px;
  padding: ${tokens.spacing.s150} ${tokens.spacing.s150} ${tokens.spacing.s150}
    ${tokens.spacing.s100};
  object-fit: contain;
`;

export {
  StyledContainer,
  StyledUl,
  StyledLi,
  StyledContainerOption,
  StyledImg,
};
