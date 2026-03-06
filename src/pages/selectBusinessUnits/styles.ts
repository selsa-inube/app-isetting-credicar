import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledImage {
  width?: string;
}

const StyledContainerPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  margin: auto;
  max-width: 1440px;
  outline: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 ?? inube.palette.neutral.N40};
`;

const StyledWelcomeContainer = styled.div`
  background-color: ${inube.palette.neutral.N30};
`;

const StyledOutletContainer = styled(StyledWelcomeContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${inube.palette.neutral.N0};
`;

const StyledImage = styled.img<IStyledImage>`
  width: ${({ width }) => width};
  max-width: 1200px;
`;

export {
  StyledContainerPage,
  StyledWelcomeContainer,
  StyledOutletContainer,
  StyledImage,
};
