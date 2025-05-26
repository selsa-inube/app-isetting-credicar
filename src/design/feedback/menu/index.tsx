import { MdOutlineClear } from "react-icons/md";
import { Icon, Stack } from "@inubekit/inubekit";
import { IMenu } from "@src/types/design/IMenu";
import { ComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { StyledContent } from "./styles";
import { MenuItem } from "./menuItem";

const Menu = (props: IMenu) => {
  const { options, onToggleInfoModal, onClose } = props;

  const close = options.length > 1 ? false : true;

  return (
    <StyledContent $options={options.length}>
      <Stack direction="column">
        {options.map((option, index) => (
          <Stack key={index} direction="column">
            <MenuItem
              description={option.description}
              icon={option.icon}
              disabled={option.disabled}
              path={option.path}
              onToggleInfoModal={onToggleInfoModal}
              close={close}
              onClose={onClose}
            />
          </Stack>
        ))}
      </Stack>

      {!close && (
        <Stack
          justifyContent="flex-end"
          margin={`${tokens.spacing.s075} ${tokens.spacing.s100} ${tokens.spacing.s0} ${tokens.spacing.s025}`}
        >
          <Icon
            icon={<MdOutlineClear />}
            size="16px"
            appearance={ComponentAppearance.DARK}
            onClick={onClose}
            cursorHover
          />
        </Stack>
      )}
    </StyledContent>
  );
};
export { Menu };
