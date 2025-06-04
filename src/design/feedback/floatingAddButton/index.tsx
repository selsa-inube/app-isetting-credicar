import { MdAddCircle } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";
import { IFloatingAddButton } from "@ptypes/design/IFloatingAddButton";
import { ComponentAppearance } from "@enum/appearances";
import { StyledFloatingButton } from "./styles";

const FloatingAddButton = (props: IFloatingAddButton) => {
  const { bottom, right, onToggleModal } = props;

  return (
    <StyledFloatingButton
      onClick={onToggleModal}
      $bottom={bottom}
      $right={right}
    >
      <Icon
        icon={<MdAddCircle />}
        size={"60px"}
        appearance={ComponentAppearance.PRIMARY}
      />
    </StyledFloatingButton>
  );
};
export { FloatingAddButton };
