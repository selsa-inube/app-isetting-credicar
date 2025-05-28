import { Divider, inube, Stack, Text } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@enum/appearances";
import { detailsRequestInProgressModal } from "@config/payrollAgreement/requestsInProgressTab/details/detailsRequestInProgressModal";
import { TraceabilityCard } from "@design/feedback/traceabilityCard";
import { ModalWrapper } from "@design/modals/modalWrapper";
import { BoxContainer } from "@design/layout/boxContainer";
import { DetailBox } from "@design/feedback/detailBox";
import { IRequestsInProcess } from "@ptypes/payrollAgreement/requestInProgTab/IRequestsInProcess";
import { IEntry } from "@ptypes/design/table/IEntry";
import { useThemeData } from "@utils/theme";

const RequestsInProcess = (props: IRequestsInProcess) => {
  const {
    data,
    title,
    labelsOfRequest,
    labelsOfTraceability,
    isMobile,
    onCloseModal,
    onClick,
  } = props;

  const theme = useThemeData();

  return (
    <ModalWrapper
      portalId="portal"
      width={isMobile ? "335px" : "600px"}
      isMobile={isMobile}
      labelActionButton={detailsRequestInProgressModal.labelActionButton}
      labelCloseButton={detailsRequestInProgressModal.labelCloseButton}
      labelCloseModal={detailsRequestInProgressModal.labelCloseModal}
      iconBeforeButton={detailsRequestInProgressModal.iconBeforeButton}
      title={detailsRequestInProgressModal.title}
      withCancelButton={true}
      onCloseModal={onCloseModal}
      onClick={onClick}
    >
      <BoxContainer
        direction="column"
        backgroundColor={
          theme?.palette?.neutral?.N0 ?? inube.palette.neutral.N0
        }
        borderRadius={tokens.spacing.s100}
        borderColor={theme?.palette?.neutral?.N40 ?? inube.palette.neutral.N40}
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
              appearance={ComponentAppearance.GRAY}
            >
              {title}
            </Text>
            <Divider dashed />
          </Stack>
        </Stack>
        <BoxContainer
          backgroundColor={
            theme?.palette?.neutral?.N0 ?? inube.palette.neutral.N0
          }
          overflowY="auto"
          boxSizing="border-box"
          wrap="wrap"
          width="100%"
          gap={isMobile ? `${tokens.spacing.s075}` : `${tokens.spacing.s150}`}
        >
          <Stack
            gap={tokens.spacing.s250}
            direction={isMobile ? "column" : "row"}
          >
            {labelsOfRequest.map((field, id) => (
              <DetailBox
                key={id}
                field={field}
                data={data}
                id={id}
                backgroundColor={
                  theme
                    ? theme?.palette?.neutral?.N10
                    : inube.palette.neutral.N10
                }
                borderRadius={tokens.spacing.s100}
                padding={`${tokens.spacing.s075} ${tokens.spacing.s150}`}
                width={isMobile ? "253px" : "240px"}
                borderColor={
                  theme
                    ? theme?.palette?.neutral?.N40
                    : inube.palette.neutral.N40
                }
                ellipsis
              />
            ))}
          </Stack>

          <Stack
            margin={`${tokens.spacing.s075} ${tokens.spacing.s0}`}
            direction="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            gap={tokens.spacing.s150}
          >
            <Text type="label" size="large" weight="bold">
              {detailsRequestInProgressModal.labelsTraceability}
            </Text>

            <Stack
              direction="column"
              gap={tokens.spacing.s150}
              alignItems="center"
            >
              {data.traceability.map((entry: IEntry, index: number) => (
                <Stack key={index}>
                  <TraceabilityCard
                    data={entry}
                    isMobile={isMobile}
                    labels={labelsOfTraceability}
                  />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </BoxContainer>
      </BoxContainer>
    </ModalWrapper>
  );
};

export { RequestsInProcess };
