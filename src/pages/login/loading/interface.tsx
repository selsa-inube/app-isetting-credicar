import { Stack, Text, Spinner } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing/spacing";

const LoadingUI = () => {
  return (
    <Stack gap={spacing.s200} direction="column">
      <Stack direction="column">
        <Text type="title" textAlign="center">
          Cargando la aplicación
        </Text>
        <Text type="title" size="small" textAlign="center">
          Espere un momento, por favor.
        </Text>
      </Stack>
      <Stack alignItems="center" direction="column">
        <Spinner size="large" transparent={false} />
      </Stack>
    </Stack>
  );
};

export { LoadingUI };
