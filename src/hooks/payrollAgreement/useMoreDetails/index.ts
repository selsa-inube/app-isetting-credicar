import { useMediaQuery } from "@inubekit/inubekit";
import { IEntry } from "@ptypes/design/table/IEntry";
import { mediaQueryMobile } from "@config/environment";
import { IUseMoreDetails } from "@ptypes/hooks/payrollAgreement/IUseMoreDetails";

const useMoreDetails = (props: IUseMoreDetails) => {
  const {
    smallScreenTab,
    filteredTabsConfig,
    detailsTabsConfig,
    ordinaryPaymentData,
    ordinaryEliminatedData,
    extraordinaryPaymentData,
    ordinaryIncludedData,
    extraordinaryIncludedData,
    extraordinaryEliminatedData,
    isSelected,
  } = props;
  const isMobile = useMediaQuery(mediaQueryMobile);

  const scroll =
    smallScreenTab || Object.entries(filteredTabsConfig).length > 2
      ? true
      : false;

  const hasData = (data?: IEntry[]) => data && data.length > 0;

  const hasAnyPaymentData = [
    ordinaryPaymentData,
    extraordinaryPaymentData,
    ordinaryIncludedData,
    ordinaryEliminatedData,
    extraordinaryIncludedData,
    extraordinaryEliminatedData,
  ].some(hasData);

  const showOrdinaryPayCycles =
    ordinaryPaymentData && isSelected === detailsTabsConfig.ordinaryPayment?.id;

  const showExtraordinaryPayCycles =
    extraordinaryPaymentData &&
    extraordinaryPaymentData.length > 0 &&
    isSelected === detailsTabsConfig.extraordinaryPayment?.id;

  const showOrdinaryIncluded =
    ordinaryIncludedData &&
    ordinaryIncludedData.length > 0 &&
    isSelected === detailsTabsConfig.ordinaryPaymentIncluded?.id;

  const showOrdinaryEliminated =
    ordinaryEliminatedData &&
    ordinaryEliminatedData.length > 0 &&
    isSelected === detailsTabsConfig.ordinaryPaymentRemoved?.id;

  const showExtraordinaryIncluded =
    extraordinaryIncludedData &&
    extraordinaryIncludedData.length > 0 &&
    isSelected === detailsTabsConfig.extraordinaryPaymentIncluded?.id;

  const showExtraordinaryEliminated =
    extraordinaryEliminatedData &&
    extraordinaryEliminatedData.length > 0 &&
    isSelected === detailsTabsConfig.extraordinaryPaymentRemoved?.id;

  return {
    isMobile,
    scroll,
    hasAnyPaymentData,
    showOrdinaryPayCycles,
    showExtraordinaryPayCycles,
    showOrdinaryIncluded,
    showOrdinaryEliminated,
    showExtraordinaryIncluded,
    showExtraordinaryEliminated,
  };
};

export { useMoreDetails };
