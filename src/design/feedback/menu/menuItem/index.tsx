import { MdInfoOutline, MdOutlineClear } from "react-icons/md";
import { Icon, inube, Stack, Text } from "@inubekit/inubekit";

import { IMenuItem } from "@ptypes/design/IMenuItem";
import { ComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { useThemeData } from "@utils/theme";
import { StyledMenuItemLink } from "./styles";

const MenuItem = (props: IMenuItem) => {
  const {
    description,
    icon,
    disabled = false,
    path = "",
    onToggleInfoModal,
    close = true,
    onClose,
  } = props;

  const theme = useThemeData();
  const disabledPath = disabled ? "" : path;

  return (
    <BoxContainer
      justifyContent="space-between"
      alignItems="center"
      height="36px"
      width="100%"
      padding={`${tokens.spacing.s100} ${tokens.spacing.s150}`}
      gap={tokens.spacing.s050}
      boxSizing="border-box"
      backgroundColor={theme?.palette?.neutral?.N0 ?? inube.palette.neutral.N0}
    >
      <StyledMenuItemLink to={disabledPath}>
        <Stack gap={tokens.spacing.s050} alignItems="center">
          <Icon
            icon={icon}
            size="18px"
            appearance={ComponentAppearance.PRIMARY}
            disabled={disabled}
          />

          <Text
            size="small"
            appearance={ComponentAppearance.DARK}
            disabled={disabled}
          >
            {description}
          </Text>

          {disabled && (
            <Icon
              icon={<MdInfoOutline />}
              size="16px"
              appearance={ComponentAppearance.PRIMARY}
              onClick={onToggleInfoModal}
            />
          )}
        </Stack>
      </StyledMenuItemLink>
      {close && (
        <Icon
          icon={<MdOutlineClear />}
          size="16px"
          appearance={ComponentAppearance.DARK}
          onClick={onClose}
        />
      )}
    </BoxContainer>
  );
};

export { MenuItem };
