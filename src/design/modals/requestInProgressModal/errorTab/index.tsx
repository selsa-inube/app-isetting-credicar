import { Divider, Stack, Text } from "@inubekit/inubekit";
import { DetailBox } from "@design/feedback/detailBox";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { detailsRequestInProgressModal } from "@config/payrollAgreement/requestsInProgressTab/details/detailsRequestInProgressModal";
import { IErrorTab } from "@ptypes/design/IErrorTab";
import { ISettingRequestError } from "@ptypes/requestInProgress/ISettingRequestError";
import { SettingError } from "./settingRequestError";

const ErrorTab = (props: IErrorTab) => {
  const { data, title, isMobile, labelsOfRequest } = props;

  const labelsOfRequestDetails = labelsOfRequest.filter(
    (field) => data[field.id],
  );
  const hasSettingRequestError =
    Object.values(data.settingRequestError).length === 0;

  return (
    <Stack direction="column" gap={tokens.spacing.s200}>
      <Stack gap={tokens.spacing.s250} direction={isMobile ? "column" : "row"}>
        {labelsOfRequestDetails.map((field, id) => (
          <DetailBox
            key={id}
            field={field}
            data={data}
            id={id}
            borderRadius={tokens.spacing.s100}
            padding={`${tokens.spacing.s075} ${tokens.spacing.s150}`}
            width={isMobile ? "100%" : "240px"}
            borderColor={EComponentAppearance.DARK}
            ellipsis
          />
        ))}
      </Stack>

      <BoxContainer
        direction="column"
        backgroundColor={EComponentAppearance.LIGHT}
        borderRadius={tokens.spacing.s100}
        borderColor={EComponentAppearance.DARK}
        boxSizing="border-box"
        width="100%"
        height={isMobile ? "400px" : "430px"}
        gap={tokens.spacing.s200}
        padding={isMobile ? `${tokens.spacing.s150}` : `${tokens.spacing.s200}`}
      >
        <Stack
          gap={tokens.spacing.s200}
          direction="column"
          alignItems="center"
          width="100%"
        >
          <Stack
            direction="column"
            justifyContent="left"
            width="100%"
            gap={tokens.spacing.s100}
          >
            <Text
              type="title"
              size="medium"
              weight="bold"
              appearance={EComponentAppearance.GRAY}
            >
              {title}
            </Text>
            <Divider dashed />
          </Stack>
        </Stack>
        <BoxContainer
          backgroundColor={EComponentAppearance.LIGHT}
          overflowY="auto"
          boxSizing="border-box"
          wrap="wrap"
          width="100%"
          gap={isMobile ? `${tokens.spacing.s075}` : `${tokens.spacing.s150}`}
        >
          {hasSettingRequestError ? (
            <Text size="medium">
              {detailsRequestInProgressModal.withoutError}
            </Text>
          ) : (
            data.settingRequestError.map((setting: ISettingRequestError) => (
              <SettingError
                key={setting.errorId}
                errorDescription={setting.errorDescription}
                settingRequestId={setting.settingRequestId}
                errorDate={setting.errorDate}
              />
            ))
          )}
        </BoxContainer>
      </BoxContainer>
    </Stack>
  );
};

export { ErrorTab };
