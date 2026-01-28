import { Stack, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { statusFlowAutomatic } from "@config/status/statusFlowAutomatic";
import { tokens } from "@design/tokens";
import { RequestProcessModal } from "@design/modals/requestProcessModal";
import { noStaffName } from "@config/noStaffName";
import { IRequestProcessContent } from "@ptypes/design/IRequestProcessContent";

const RequestProcess = (props: IRequestProcessContent) => {
  const {
    descriptionRequestProcess,
    portalId,
    requestProcessSteps,
    saveData,
    changeZIndex,
    descriptionRequestStatus,
    onCloseRequestStatus,
    onCloseProcess,
  } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const staffDisplayName = saveData?.staffName ?? noStaffName.label;

  const withoutRequestStatus = saveData && saveData.requestStatus !== "";

  return (
    <Stack
      direction="column"
      gap={tokens.spacing.s300}
      justifyContent="center"
      alignContent="center"
    >
      {withoutRequestStatus &&
        (statusFlowAutomatic.includes(saveData.requestStatus) ? (
          <RequestProcessModal
            portalId={portalId}
            title={descriptionRequestProcess.title}
            description={descriptionRequestProcess.description}
            requestSteps={requestProcessSteps}
            isMobile={isMobile}
            sizeIcon="28px"
            onClose={onCloseProcess}
            changeZIndex={changeZIndex}
          />
        ) : (
          <RequestStatusModal
            portalId={portalId}
            title={descriptionRequestStatus(staffDisplayName).title}
            description={descriptionRequestStatus(staffDisplayName).description}
            requestNumber={saveData.requestNumber}
            onClick={onCloseRequestStatus}
            onCloseModal={onCloseRequestStatus}
            loading={false}
            actionText={descriptionRequestStatus(staffDisplayName).actionText}
            appearance={EComponentAppearance.PRIMARY}
            changeZIndex={changeZIndex}
          />
        ))}
    </Stack>
  );
};

export { RequestProcess };
