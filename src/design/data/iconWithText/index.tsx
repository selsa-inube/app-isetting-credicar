import { Icon, Stack, Text, useMediaQuery } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { mediaQueryTablet } from "@config/environment";
import { IIconWithText } from "@ptypes/design/IIconWithText";

const IconWithText = (props: IIconWithText) => {
  const {
    icon,
    text,
    withIconBefore,
    withIconAfter,
    sizeIcon = "20px",
    sizeMobileIcon = "18px",
    appearanceIcon = EComponentAppearance.DARK,
    gapContainer = tokens.spacing.s075,
  } = props;

  const isMobile = useMediaQuery(mediaQueryTablet);
  return (
    <Stack gap={gapContainer} alignItems="center">
      {withIconBefore && (
        <Icon
          icon={icon}
          appearance={appearanceIcon}
          size={isMobile ? sizeMobileIcon : sizeIcon}
        />
      )}
      <Text type="body" size="small" ellipsis>
        {text}
      </Text>
      {withIconAfter && (
        <Icon
          icon={icon}
          appearance={appearanceIcon}
          size={isMobile ? sizeMobileIcon : sizeIcon}
        />
      )}
    </Stack>
  );
};

export { IconWithText };
