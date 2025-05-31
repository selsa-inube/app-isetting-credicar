import { IFloatingAddButton } from "@ptypes/design/IFloatingAddButton";
import { StyledCircleWithCross, StyledFloatingButton } from "./styles";

const FloatingAddButton = (props: IFloatingAddButton) => {
  const { bottom, right, onToggleModal } = props;

  return (
    <StyledFloatingButton
      onClick={onToggleModal}
      $bottom={bottom}
      $right={right}
    >
      <StyledCircleWithCross />
    </StyledFloatingButton>
  );
};
export { FloatingAddButton };
