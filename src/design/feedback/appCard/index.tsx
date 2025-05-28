import {
  Stack,
  Text,
  Icon,
  useMediaQuery,
  SkeletonIcon,
  SkeletonLine,
} from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { StyledAppCard } from "./styles";

interface IAppCard {
  description?: string;
  icon?: React.ReactNode;
  label?: string;
  url?: string;
  loading?: boolean;
}

const AppCard = (props: IAppCard) => {
  const { label, description, icon, url, loading } = props;
  const screenMobile = useMediaQuery("(max-width: 400px)");
  if (loading) {
    return (
      <StyledAppCard to={url ?? ""} $isMobile={screenMobile}>
        <Stack direction="column" gap={tokens.spacing.s200}>
          <Stack width="70%">
            <SkeletonLine animated />
          </Stack>
          <Stack width="100%">
            <SkeletonLine animated />
          </Stack>
        </Stack>
        <Stack justifyContent="flex-end">
          <SkeletonIcon animated />
        </Stack>
      </StyledAppCard>
    );
  }
  return (
    <StyledAppCard to={url ?? ""} $isMobile={screenMobile}>
      <Stack direction="column" gap={tokens.spacing.s200}>
        <Text type="title" size="medium" weight="bold">
          {label}
        </Text>
        <Text type="body" size="small">
          {description}
        </Text>
      </Stack>
      <Stack justifyContent="flex-end">
        <Icon icon={icon} appearance="dark" size="24px" cursorHover />
      </Stack>
    </StyledAppCard>
  );
};

export { AppCard };
export type { IAppCard };
