import { Icon, Stack, Text, useMediaQuery } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { mediaQueryTablet } from "@config/environment";
interface IIconWithText {
  icon: React.ReactNode;
  text: string;
}

const IconWithText = (props: IIconWithText) => {
  const { icon, text } = props;

  const isMobile = useMediaQuery(mediaQueryTablet);
  return (
    <Stack gap={tokens.spacing.s075} alignItems="center">
      <Icon
        icon={icon}
        appearance={EComponentAppearance.DARK}
        size={isMobile ? "18px" : "20px"}
      />
      <Text type="body" size="small" ellipsis>
        {text}
      </Text>
    </Stack>
  );
};

export { IconWithText };
