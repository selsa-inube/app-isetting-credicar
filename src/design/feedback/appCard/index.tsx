import {
  Stack,
  Text,
  Icon,
  useMediaQuery,
  SkeletonIcon,
  SkeletonLine,
  Divider,
} from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";
import { IAppCard } from "@ptypes/design/IAppCard";
import { StyledAppCard } from "./styles";

const AppCard = (props: IAppCard) => {
  const { label, description, icon, url, loading } = props;
  const screenMobile = useMediaQuery("(max-width: 400px)");
  if (loading) {
    return (
      <StyledAppCard to={url ?? ""} $isMobile={screenMobile}>
        <Stack justifyContent="space-between">
          <SkeletonLine animated width="60%" height="24px" />
          <SkeletonIcon animated />
        </Stack>
        <Divider dashed />
        <SkeletonLine animated width="100%" height="48px" />
      </StyledAppCard>
    );
  }
  return (
    <StyledAppCard to={url ?? ""} $isMobile={screenMobile}>
      <Stack justifyContent="space-between">
        <Text type="title" size="medium" weight="bold">
          {label}
        </Text>
        <Icon icon={icon} appearance="dark" size="22px" cursorHover />
      </Stack>
      <Divider dashed />
      <Text size="small" appearance={EComponentAppearance.GRAY}>
        {description}
      </Text>
    </StyledAppCard>
  );
};

export { AppCard };
export type { IAppCard };
