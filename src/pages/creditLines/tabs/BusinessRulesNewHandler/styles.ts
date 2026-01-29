import styled from "styled-components";

interface IScroll {
  $maxHeight: number;
  $withFloatingActions?: boolean;
}

const FLOATING_ACTIONS_SAFE_SPACE = 140;

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
 & > div > div > div  {
  max-height: ${({ $maxHeight }) => `${$maxHeight}px`};
  overflow-y: auto;
  overflow-x: hidden;

  padding-bottom: ${({ $withFloatingActions }) =>
    $withFloatingActions ? `${FLOATING_ACTIONS_SAFE_SPACE}px` : "0px"};

  scroll-padding-bottom: ${({ $withFloatingActions }) =>
    $withFloatingActions ? `${FLOATING_ACTIONS_SAFE_SPACE}px` : "0px"};
`;

export {
  StyledCardContainer,
  StyledMultipleChoiceContainer,
  StyledRulesScroll,
};
