import styled from "styled-components";

interface IStyledTextarea {
  $smallScreen: boolean;
}

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

export { StyledTextarea };
