import { SkeletonLine, Stack } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

const SkeletonField = ({
  labelWidth,
  fieldHeight = "32px",
}: {
  labelWidth: string;
  fieldHeight?: string;
}) => (
  <Stack width="100%" gap={tokens.spacing.s100} direction="column">
    <SkeletonLine animated width={labelWidth} height="16px" />
    <SkeletonLine width="100%" height={fieldHeight} animated />
  </Stack>
);

export { SkeletonField };
