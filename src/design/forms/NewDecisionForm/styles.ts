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

const StyledFixedContainerMessage = styled.div`
  margin-bottom: 90px;
`;

export {
  StyledCardContainer,
  StyledFixedContainerMessage,
  StyledMultipleChoiceContainer,
};
