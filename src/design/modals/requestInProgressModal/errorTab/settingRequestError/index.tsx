import { MdCalendarMonth, MdOutlineErrorOutline } from "react-icons/md";
import { Grid, Icon, Stack, Text } from "@inubekit/inubekit";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";
import { formatDateTable } from "@utils/date/formatDateTable";
import { EComponentAppearance } from "@enum/appearances";
import { ISettingRequestError } from "@ptypes/requestInProgress/ISettingRequestError";

const SettingError = (props: ISettingRequestError) => {
  const { errorDescription, settingRequestId, errorDate } = props;

  const normalizeDate = formatDateTable(new Date(String(errorDate)), true);

  return (
    <BoxContainer
      key={settingRequestId}
      direction="column"
      backgroundColor={EComponentAppearance.DANGER}
      borderRadius={tokens.spacing.s100}
      borderColor={EComponentAppearance.DANGER}
      boxSizing="border-box"
      width="100%"
      height="auto"
      gap={tokens.spacing.s200}
      padding={tokens.spacing.s150}
    >
      <Grid templateColumns="1fr auto" width="100%" alignItems="center">
        <Stack gap={tokens.spacing.s050} direction="column">
          <Stack gap={tokens.spacing.s100}>
            <Icon
              icon={<MdCalendarMonth />}
              size="16px"
              appearance={EComponentAppearance.DARK}
            />
            <Text type="label" size="large" weight="bold">
              {normalizeDate}
            </Text>
          </Stack>
          <Stack padding={tokens.spacing.s050}>
            <Text size="medium" appearance={EComponentAppearance.GRAY}>
              {errorDescription}
            </Text>
          </Stack>
        </Stack>

        <Icon
          icon={<MdOutlineErrorOutline />}
          size="16px"
          appearance={EComponentAppearance.DANGER}
        />
      </Grid>
    </BoxContainer>
  );
};

export { SettingError };
