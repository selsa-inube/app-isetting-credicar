import { IScroll } from "@ptypes/creditLines/IScroll";
import styled from "styled-components";

const StyledCardContainer = styled.div`
  & > div {
    height: 340px;
    width: 332px;
  }
`;

const StyledMultipleChoiceContainer = styled.div`
  width: -webkit-fill-available;
`;

const StyledRulesScroll = styled.div<IScroll>`
  & > div > div > div {
    max-height: ${({ $maxHeight }) => `${$maxHeight}px`};
    overflow-y: auto;
    overflow-x: hidden;

    margin-bottom: ${({ $withFloatingActions }) =>
      $withFloatingActions ? "70px" : "0px"};
    scroll-padding-bottom: ${({ $withFloatingActions }) =>
      $withFloatingActions ? "70px" : "0px"};
  }
`;

const StyledFixedContainerMessage = styled.div`
  margin-bottom: 90px;
`;

export {
  StyledCardContainer,
  StyledFixedContainerMessage,
  StyledMultipleChoiceContainer,
  StyledRulesScroll,
};
