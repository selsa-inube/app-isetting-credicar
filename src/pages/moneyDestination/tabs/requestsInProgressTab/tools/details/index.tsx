import { useMediaQuery } from "@inubekit/inubekit";
import { useDetailsRequestInProgress } from "@hooks/moneyDestination/useDetailsRequestInProgress";
import { useMoreDetailsRequestProgress } from "@hooks/moneyDestination/useMoreDetailsRequestProgress";
import { DetailsRequestInProcess } from "@pages/moneyDestination/tabs/requestsInProgressTab/tools/details/detailsRequestInProcess";
import { mediaQueryMobile } from "@config/environment";
import { IDetails } from "@ptypes/moneyDestination/tabs/IDetails";

const Details = (props: IDetails) => {
  const { data } = props;

  const {
    showModal,
    normalizeData,
    filteredRequestTabs,
    showTrazabilityData,
    showErrorData,
    withErrorRequest,
    loading,
    modalData,
    showDecision,
    title: titleRequest,
    isSelected: isSelectedRequest,
    defaultSelectedTab: defaultSelectedRequestTab,
    statusRequestData,
    handleTabRequestChange,
    handleToggleModal,
  } = useDetailsRequestInProgress(data);

  const {
    showMoreDetailsModal,
    moreDetailsData,
    isMoreDetails,
    onToggleMoreDetailsModal,
  } = useMoreDetailsRequestProgress(data);

  const isMobile = useMediaQuery(mediaQueryMobile);

  return (
    <DetailsRequestInProcess
      data={normalizeData}
      showModal={showModal}
      onToggleModal={handleToggleModal}
      moreDetailsData={moreDetailsData}
      showMoreDetailsModal={showMoreDetailsModal}
      onToggleMoreDetailsModal={onToggleMoreDetailsModal}
      isMoreDetails={isMoreDetails}
      isMobile={isMobile}
      titleRequest={titleRequest}
      isSelectedRequest={isSelectedRequest ?? defaultSelectedRequestTab ?? ""}
      filteredTabs={filteredRequestTabs}
      showTrazabilityData={showTrazabilityData}
      showErrorData={showErrorData}
      withErrorRequest={withErrorRequest}
      loading={loading}
      onTabRequestChange={handleTabRequestChange}
      onClick={statusRequestData.onClick}
      modalData={modalData}
      showDecision={showDecision}
      labelButton={statusRequestData.textButton}
      iconButton={statusRequestData.iconButton}
    />
  );
};

export { Details };
