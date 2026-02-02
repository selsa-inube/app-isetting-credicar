import { Spinner, Stack, Text } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

const Loading = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="column"
      width="100%"
      height="600px"
      gap={tokens.spacing.s200}
    >
      <Text type="headline" size="medium" textAlign="center">
        Cargando la aplicación
      </Text>
      <Text type="title" size="small" textAlign="center">
        Espere un momento, por favor.
      </Text>

      <Stack alignItems="center" direction="column">
        <Spinner size="large" transparent={false} />
      </Stack>
    </Stack>
  );
};

export { Loading };
