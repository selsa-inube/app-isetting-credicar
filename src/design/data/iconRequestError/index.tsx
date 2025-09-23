import { MdOutlineWarning } from "react-icons/md";
import { Stack, Text } from "@inubekit/inubekit";
import { IconWithText } from "@design/data/iconWithText";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { approvalInRequest } from "@config/status/approvalInRequest";
import { IIconRequestError } from "@ptypes/design/IIconRequestError";

const IconRequestError = (props: IIconRequestError) => {
  const { status } = props;

  const withError = approvalInRequest.includes(status);

  return (
    <Stack width="100%">
      {!withError ? (
        <Stack width="100%" justifyContent="center">
          <Text size="small" textAlign="end">
            {status}
          </Text>
        </Stack>
      ) : (
        <Stack width="100%" justifyContent="center">
          <IconWithText
            withIconAfter
            icon={<MdOutlineWarning />}
            text={String(status)}
            sizeIcon="16px"
            sizeMobileIcon="16px"
            appearanceIcon={EComponentAppearance.WARNING}
            gapContainer={tokens.spacing.s0}
          />
        </Stack>
      )}
    </Stack>
  );
};

export { IconRequestError };
