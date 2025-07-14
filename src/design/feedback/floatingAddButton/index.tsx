import { MdAddCircle } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";
import { IFloatingAddButton } from "@ptypes/design/IFloatingAddButton";
import { EComponentAppearance } from "@enum/appearances";
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
        appearance={EComponentAppearance.PRIMARY}
      />
    </StyledFloatingButton>
  );
};
export { FloatingAddButton };
