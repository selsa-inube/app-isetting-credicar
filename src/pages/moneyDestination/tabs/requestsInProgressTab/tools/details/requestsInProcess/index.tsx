import { Divider, Stack, Text } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { RequestType } from "@enum/requestType";
import { TraceabilityCard } from "@design/feedback/traceabilityCard";
import { ModalWrapper } from "@design/modals/modalWrapper";
import { BoxContainer } from "@design/layout/boxContainer";
import { detailsRequestInProgressModal } from "@config/moneyDestination/requestsInProgressTab/details/detailsRequestInProgressModal";
import { DetailBox } from "@design/feedback/detailBox";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IRequestsInProcess } from "@ptypes/moneyDestination/tabs/IRequestsInProcess";

const RequestsInProcess = (props: IRequestsInProcess) => {
  const {
    data,
    labelsOfRequest,
    labelsOfTraceability,
    isMobile,
    onCloseModal,
    onClick,
  } = props;

  const labelsOfRequestDetails = labelsOfRequest.filter(
    (field) => data[field.id],
  );

  const title = `${detailsRequestInProgressModal.labelRequest} ${
    RequestType[data.request as keyof typeof RequestType] ?? data.request
  }`;

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
        borderRadius={tokens.spacing.s100}
        borderColor={EComponentAppearance.DARK}
        boxSizing="border-box"
        width="auto"
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
            {labelsOfRequestDetails.map((field, id) => (
              <DetailBox
                key={id}
                field={field}
                data={data}
                id={id}
                borderRadius={tokens.spacing.s100}
                padding={`${tokens.spacing.s075} ${tokens.spacing.s150}`}
                width={isMobile ? "253px" : "240px"}
                borderColor={EComponentAppearance.DARK}
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
export type { IRequestsInProcess };
