import { Spinner } from "@inubekit/spinner";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { tokens } from "@design/tokens";

const LoadingAppUI = () => {
  return (
    <Stack gap={tokens.spacing.s200} direction="column">
      <Stack direction="column">
        <Text type="title" textAlign="center">
          Cargando la aplicación
        </Text>
        <Text type="title" size="small" textAlign="center">
          Espere un momento, por favor.
        </Text>
      </Stack>
      <Stack alignItems="center" direction="column">
        <Spinner size="large" />
      </Stack>
    </Stack>
  );
};

export { LoadingAppUI };
