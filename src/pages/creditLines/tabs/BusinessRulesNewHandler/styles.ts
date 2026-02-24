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
  width: 100%;
  & > div > div > div {
    max-height: ${({ $maxHeight }) => `${$maxHeight}px`};
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

export {
  StyledCardContainer,
  StyledMultipleChoiceContainer,
  StyledRulesScroll,
};
