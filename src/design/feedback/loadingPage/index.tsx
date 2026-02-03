import { Spinner, Stack, Text } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { loadingLabels } from "@config/loadingLabels";

const LoadingPage = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="column"
      width="100%"
      height="100%"
      gap={tokens.spacing.s200}
    >
      <Spinner size="large" />
      <Text type="title" size="medium" textAlign="center">
        {loadingLabels.loading}
      </Text>
    </Stack>
  );
};

export { LoadingPage };
