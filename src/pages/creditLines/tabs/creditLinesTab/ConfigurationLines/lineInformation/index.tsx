import { MdCloudUpload, MdInfo } from "react-icons/md";
import {
  Divider,
  Fieldset,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { configurationLabels } from "@config/creditLines/configurationLabels";
import { ILineInformation } from "@ptypes/creditLines/ILineInformation";

const LineInformation = (props: ILineInformation) => {
  const { lineName, LineType, updateData, onToggleInfoModal } = props;

  return (
    <Fieldset
      legend={configurationLabels.lineInformation}
      height="auto"
      spacing="compact"
    >
      <Stack direction="column" width="100%" gap={tokens.spacing.s150}>
        <Stack width="100%" justifyContent="space-between">
          <Text
            type="title"
            size="medium"
            appearance={EComponentAppearance.GRAY}
            weight="bold"
          >
            {lineName}
          </Text>
          {updateData ? (
            <Spinner size="small" />
          ) : (
            <Icon
              icon={<MdCloudUpload />}
              appearance={EComponentAppearance.SUCCESS}
              size="24px"
            />
          )}
        </Stack>

        <Divider dashed />
        <Stack width="100%" gap={tokens.spacing.s100} alignItems="center">
          <Text type="title" size="small" weight="bold">
            {LineType}
          </Text>
          <Icon
            icon={<MdInfo />}
            appearance={EComponentAppearance.HELP}
            onClick={onToggleInfoModal}
            size="24px"
            cursorHover
          />
        </Stack>
      </Stack>
    </Fieldset>
  );
};

export { LineInformation };
