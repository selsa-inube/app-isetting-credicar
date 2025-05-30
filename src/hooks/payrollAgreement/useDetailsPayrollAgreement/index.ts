import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { mediaQueryMobile } from "@config/environment";
import { normalizeEnumName } from "@utils/normalizeEnumName";
import { IUseDetailsPayrollAgreement } from "@ptypes/hooks/payrollAgreement/IUseDetailsPayrollAgreement";
import { labelsOfRequest } from "@config/payrollAgreement/requestsInProgressTab/details/labelsOfRequest";
import { detailsRequestInProgressModal } from "@config/payrollAgreement/requestsInProgressTab/details/detailsRequestInProgressModal";
import { RequestType } from "@enum/requestType";
import { IDetailsTabsConfig } from "@ptypes/payrollAgreement/requestInProgTab/IDetailsTabsConfig";
import { IEntry } from "@ptypes/design/table/IEntry";
import { eventBus } from "@events/eventBus";
import { getDayPayment } from "@utils/getDayPayment";
import { dataTranslations } from "@utils/dataTranslations";
import { getSourcesIncome } from "@utils/getSourcesIncome";

const useDetailsPayrollAgreement = (props: IUseDetailsPayrollAgreement) => {
  const { data, detailsTabsConfig, showModalReq } = props;

  const [isSelected, setIsSelected] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const isMobile = useMediaQuery(mediaQueryMobile);

  const normalizeData = {
    id: data.id,
    TypePayroll:
      dataTranslations[data.payrollForDeductionAgreementType] ??
      data.payrollForDeductionAgreementType,
    daysToDetermineDate:
      data.numberOfDaysForReceivingTheDiscounts ?? data.applicationDaysPayroll,
    company: data.payingEntityName,
    paymentSources: getSourcesIncome(data.incomeTypes),
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const createOrdinaryCycle = (item: IEntry) => ({
    name: item.regularPaymentCycleName ?? item.nameCycle,
    periodicity:
      normalizeEnumName(item.schedule) ?? normalizeEnumName(item.periodicity),
    dayPayment: getDayPayment(item.paymentDay ?? item.payday),
    numberDays: item.numberOfDaysBeforePaymentToBill ?? item.numberDaysUntilCut,
  });

  const ordinaryPaymentData = () => {
    return data.regularPaymentCycles &&
      Object.entries(data.regularPaymentCycles).length > 0
      ? data.regularPaymentCycles.map((item: IEntry) => {
          return createOrdinaryCycle(item);
        })
      : [];
  };

  const ordinaryIncludedData = () => {
    return data.regularCyclesIncluded &&
      Object.entries(data.regularCyclesIncluded).length > 0
      ? data.regularCyclesIncluded.map((item: IEntry) => {
          return createOrdinaryCycle(item);
        })
      : [];
  };

  const ordinaryEliminatedData = (): IEntry[] => {
    return data.regularCyclesEliminated &&
      Object.entries(data.regularCyclesEliminated).length > 0
      ? data.regularCyclesEliminated.map((item: IEntry) => {
          return createOrdinaryCycle(item);
        })
      : [];
  };

  const createExtraOrdinaryCycle = (
    item: IEntry,
    index: string,
    typePayment: string,
  ) => ({
    id: index,
    name: item.abbreviatedName,
    typePayment,
    paymentDay: item.paymentDay,
    numberDays: item.numberOfDaysBeforePaymentToBill,
  });

  const extraordinaryPaymentData = () => {
    let extraordinary: IEntry[] = [];
    if (data.payrollSpecialBenefitPaymentCycles) {
      extraordinary = extraordinary.concat(
        Object.entries(data.payrollSpecialBenefitPaymentCycles).length > 0
          ? data.payrollSpecialBenefitPaymentCycles.map(
              (item: IEntry, index: string) => {
                return createExtraOrdinaryCycle(item, index, "Prima");
              },
            )
          : [],
      );
    }

    if (data.severancePaymentCycles) {
      extraordinary = extraordinary.concat(
        Object.entries(data.severancePaymentCycles).length > 0
          ? data.severancePaymentCycles.map((item: IEntry, index: string) => {
              return createExtraOrdinaryCycle(item, index, "Cesantias");
            })
          : [],
      );
    }
    return extraordinary;
  };

  const extraordinaryIncludedData = () => {
    let extraordinary: IEntry[] = [];
    if (data.payrollSpecialBenCyclesIncluded) {
      extraordinary = extraordinary.concat(
        Object.entries(data.payrollSpecialBenCyclesIncluded).length > 0
          ? data.payrollSpecialBenCyclesIncluded.map(
              (item: IEntry, index: string) => {
                return createExtraOrdinaryCycle(item, index, "Prima");
              },
            )
          : [],
      );
    }

    if (data.severanceCyclesIncluded) {
      extraordinary = extraordinary.concat(
        Object.entries(data.severanceCyclesIncluded).length > 0
          ? data.severanceCyclesIncluded.map((item: IEntry, index: string) => {
              return createExtraOrdinaryCycle(item, index, "Cesantias");
            })
          : [],
      );
    }
    return extraordinary;
  };

  const extraordinaryEliminatedData = () => {
    let extraordinary: IEntry[] = [];
    if (data.payrollSpecialBenCyclesEliminated) {
      extraordinary = extraordinary.concat(
        Object.entries(data.payrollSpecialBenCyclesEliminated).length > 0
          ? data.payrollSpecialBenCyclesEliminated.map(
              (item: IEntry, index: string) => {
                return createExtraOrdinaryCycle(item, index, "Prima");
              },
            )
          : [],
      );
    }

    if (data.severanceCyclesEliminated) {
      extraordinary = extraordinary.concat(
        Object.entries(data.severanceCyclesEliminated).length > 0
          ? data.severanceCyclesEliminated.map(
              (item: IEntry, index: string) => {
                return createExtraOrdinaryCycle(item, index, "Cesantias");
              },
            )
          : [],
      );
    }
    return extraordinary;
  };

  const filteredTabsConfig = Object.keys(detailsTabsConfig).reduce(
    (acc, key) => {
      const tab = detailsTabsConfig[key as keyof IDetailsTabsConfig];

      const ordinaryData = ordinaryPaymentData();
      const extraordinaryData = extraordinaryPaymentData();
      const ordinaryIncludedPayData = ordinaryIncludedData();
      const ordinaryPayEliminatedData = ordinaryEliminatedData();
      const extraordinaryPayIncludedData = extraordinaryIncludedData();
      const extraordinaryPayEliminatedData = extraordinaryEliminatedData();

      if (key === "ordinaryPayment" && ordinaryData.length === 0) {
        return acc;
      }

      if (key === "extraordinaryPayment" && extraordinaryData.length === 0) {
        return acc;
      }
      if (
        key === "ordinaryPaymentIncluded" &&
        ordinaryIncludedPayData.length === 0
      ) {
        return acc;
      }
      if (
        key === "ordinaryPaymentRemoved" &&
        ordinaryPayEliminatedData.length === 0
      ) {
        return acc;
      }
      if (
        key === "extraordinaryPaymentIncluded" &&
        extraordinaryPayIncludedData.length === 0
      ) {
        return acc;
      }
      if (
        key === "extraordinaryPaymentRemoved" &&
        extraordinaryPayEliminatedData.length === 0
      ) {
        return acc;
      }

      if (tab !== undefined) {
        acc[key as keyof IDetailsTabsConfig] = tab;
      }
      return acc;
    },
    {} as IDetailsTabsConfig,
  );

  const getFirstFilteredTab = (filteredTabsConfig: IDetailsTabsConfig) => {
    const keys = Object.keys(filteredTabsConfig);
    if (keys.length > 0) {
      return filteredTabsConfig[keys[0] as keyof IDetailsTabsConfig];
    }
    return undefined;
  };

  const defaultSelectedTab = getFirstFilteredTab(filteredTabsConfig)?.id;

  const labelsOfRequestDetails = labelsOfRequest.filter(
    (field) => data[field.id],
  );

  const title = `${detailsRequestInProgressModal.labelRequest} ${
    RequestType[data.request as keyof typeof RequestType] ?? data.request
  }`;

  const screenTablet = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    const emitEvent = (eventName: string) => {
      eventBus.emit(eventName, showModal);
    };
    if (showModalReq && !showModal) {
      emitEvent("secondModalState");
    } else if (!showModalReq && !showModal) {
      emitEvent("secondModalState");
    } else if (!showModalReq && showModal) {
      emitEvent("thirdModalState");
    }
  }, [showModal]);

  return {
    showModal,
    normalizeData,
    isSelected,
    isMobile,
    filteredTabsConfig,
    defaultSelectedTab,
    labelsOfRequestDetails,
    title,
    screenTablet,
    ordinaryPaymentData,
    extraordinaryPaymentData,
    ordinaryIncludedData,
    ordinaryEliminatedData,
    extraordinaryIncludedData,
    extraordinaryEliminatedData,
    handleTabChange,
    handleToggleModal,
  };
};

export { useDetailsPayrollAgreement };
