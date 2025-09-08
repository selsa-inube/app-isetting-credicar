import { SkeletonLine, Stack } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";

const DecisionBox = () => (
  <BoxContainer
    width="100%"
    height="auto"
    borderRadius={tokens.spacing.s100}
    borderColor={EComponentAppearance.DARK}
    padding={tokens.spacing.s200}
    boxSizing="border-box"
  >
    <Stack width="75%" gap={tokens.spacing.s150}>
      <SkeletonLine width="50px" height="24px" animated />
      <SkeletonLine width="150px" height="24px" animated />
      <SkeletonLine width="70px" height="24px" animated />
    </Stack>
    <Stack width="25%" gap={tokens.spacing.s150} justifyContent="flex-end">
      <SkeletonLine width="24px" height="24px" animated />
      <SkeletonLine width="24px" height="24px" animated />
      <SkeletonLine width="24px" height="24px" animated />
    </Stack>
  </BoxContainer>
);

export { DecisionBox };
