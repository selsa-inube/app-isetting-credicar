import { Tabs } from "@inubekit/inubekit";

import { ModalWrapper } from "@design/modals/modalWrapper";
import { EComponentAppearance } from "@enum/appearances";
import { detailsRequestInProgressModal } from "@config/payrollAgreement/requestsInProgressTab/details/detailsRequestInProgressModal";
import { portalId } from "@config/portalId";
import { IRequestsInProcess } from "@ptypes/payrollAgreement/requestInProgTab/IRequestsInProcess";
import { TrazabilityTab } from "./trazabilityTab";
import { ErrorTab } from "./errorTab";

const RequestsInProcess = (props: IRequestsInProcess) => {
  const {
    data,
    title,
    labelsOfRequest,
    labelsOfTraceability,
    isSelected,
    filteredTabs,
    showTrazabilityData,
    showErrorData,
    isMobile,
    withErrorRequest,
    loading,
    labelButton,
    iconButton,
    onTabChange,
    onCloseModal,
    onClick,
    onThirdClick,
  } = props;

  return (
    <ModalWrapper
      portalId={portalId}
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
      withThirdButton={withErrorRequest}
      appearanceThirdButton={EComponentAppearance.PRIMARY}
      labelThirdButton={labelButton}
      onClickThirdButton={onThirdClick}
      iconThirdButton={iconButton}
      loadingThirdButton={loading}
      fullwidthbutton
    >
      <Tabs
        tabs={filteredTabs}
        selectedTab={isSelected}
        onChange={onTabChange}
      />
      {showTrazabilityData && (
        <TrazabilityTab
          data={data}
          title={title}
          isMobile={isMobile}
          labelsOfRequest={labelsOfRequest}
          labelsOfTraceability={labelsOfTraceability}
        />
      )}

      {showErrorData && (
        <ErrorTab
          data={data}
          title={detailsRequestInProgressModal.errorTitle}
          isMobile={isMobile}
          labelsOfRequest={labelsOfRequest}
        />
      )}
    </ModalWrapper>
  );
};

export { RequestsInProcess };
