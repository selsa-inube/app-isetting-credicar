import { DetailsRequestInProcess } from "@pages/moneyDestination/tabs/requestsInProgressTab/tools/details/detailsRequestInProcess";
import { useDetailsRequestInProgress } from "@hooks/moneyDestination/useDetailsRequestInProgress";
import { mediaQueryMobile } from "@config/environment";
import { useMoreDetailsRequestProgress } from "@hooks/moneyDestination/useMoreDetailsRequestProgress";
import { IEntry } from "@ptypes/design/table/IEntry";
import { useMediaQuery } from "@inubekit/inubekit";
interface IDetails {
  data: IEntry;
}

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
    handleTabRequestChange,
    handleApproval,
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
      onApproval={handleApproval}
      modalData={modalData}
      showDecision={showDecision}
    />
  );
};

export { Details };
