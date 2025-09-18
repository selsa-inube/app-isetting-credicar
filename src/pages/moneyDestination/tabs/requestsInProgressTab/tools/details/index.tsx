import { DetailsRequestInProcess } from "@pages/moneyDestination/tabs/requestsInProgressTab/tools/details/detailsRequestInProcess";
import { useDetailsRequestInProgress } from "@hooks/moneyDestination/useDetailsRequestInProgress";
import { useMoreDetailsRequestProgress } from "@hooks/moneyDestination/useMoreDetailsRequestProgress";
import { mediaQueryMobile } from "@config/environment";
import { IEntry } from "@ptypes/design/table/IEntry";
import { useMediaQuery } from "@inubekit/inubekit";
interface IDetails {
  data: IEntry;
}

const Details = (props: IDetails) => {
  const { data } = props;

  const { showModal, normalizeData, handleToggleModal } =
    useDetailsRequestInProgress(data);

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
    />
  );
};

export { Details };
