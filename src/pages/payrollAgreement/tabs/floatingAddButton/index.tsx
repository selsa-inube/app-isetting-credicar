import { IFloatingAddButton } from "@ptypes/design/IFloatingAddButton";
import { StyledCircleWithCross, StyledFloatingButton } from "./styles";

const FloatingAddButton = (props: IFloatingAddButton) => {
  const { onToggleModal } = props;
  return (
    <StyledFloatingButton onClick={onToggleModal}>
      <StyledCircleWithCross />
    </StyledFloatingButton>
  );
};
export { FloatingAddButton };
