import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { eventBus } from "@events/eventBus";
import { EModalState } from "@enum/modalState";
import { EpayrollDetails } from "@enum/payrollDetails";
import { normalizeEnumName } from "@utils/normalizeEnumName";
import { formatPaymentDayExtra } from "@utils/formatPaymentDayExtra";
import { dataTranslations } from "@utils/dataTranslations";
import { normalizeEnumTranslation } from "@utils/normalizeEnumTranslation";
import { mediaQueryMobile, mediaQueryTablet } from "@config/environment";
import { labelsOfRequest } from "@config/payrollAgreement/requestsInProgressTab/details/labelsOfRequest";
import { detailsRequestInProgressModal } from "@config/payrollAgreement/requestsInProgressTab/details/detailsRequestInProgressModal";
import { IUseDetailsPayrollAgreement } from "@ptypes/hooks/payrollAgreement/IUseDetailsPayrollAgreement";
import { IDetailsTabsConfig } from "@ptypes/payrollAgreement/requestInProgTab/IDetailsTabsConfig";
import { IEntry } from "@ptypes/design/table/IEntry";

const useDetailsPayrollAgreement = (props: IUseDetailsPayrollAgreement) => {
  const { data, detailsTabsConfig, showModalReq } = props;

  const [isSelected, setIsSelected] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const isMobile = useMediaQuery(mediaQueryMobile);

  const dataSourcesOfIncome = (income: IEntry) => {
    return income
      ? Object.values(income)
          .filter((item: IEntry) => item.incomeType)
          .map(
            (item: IEntry) =>
              normalizeEnumTranslation(item.incomeType)?.name ??
              item.incomeType,
          )
          .join(", ")
      : undefined;
  };
  const normalizeData = {
    id: data.id,
    TypePayroll:
      dataTranslations[data.payrollForDeductionAgreementType] ??
      data.payrollForDeductionAgreementType,
    daysToDetermineDate:
      data.numberOfDaysForReceivingTheDiscounts ?? data.applicationDaysPayroll,
    company: data.payingEntityName,
    paymentSources: dataSourcesOfIncome(
      data.incomeTypes ?? data.configurationRequestData.incomeTypes,
    ),
    payrollForDeductionAgreementCode:
      data.payrollForDeductionAgreementCode ??
      data.configurationRequestData.payrollForDeductionAgreementCode,
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
    dayPayment: formatPaymentDayExtra(item.paymentDay ?? item.payday),
    numberDays: item.numberOfDaysBeforePaymentToBill ?? item.numberDaysUntilCut,
    regulatoryFrameworkCode: item.regulatoryFrameworkCode ?? "",
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
    paymentDay: formatPaymentDayExtra(item.paymentDay),
    numberDays: item.numberOfDaysBeforePaymentToBill,
    regulatoryFrameworkCode: item.regulatoryFrameworkCode ?? "",
  });

  const extraordinaryPaymentData = () => {
    let extraordinary: IEntry[] = [];
    if (data.payrollSpecialBenefitPaymentCycles) {
      extraordinary = extraordinary.concat(
        Object.entries(data.payrollSpecialBenefitPaymentCycles).length > 0
          ? data.payrollSpecialBenefitPaymentCycles.map(
              (item: IEntry, index: string) => {
                return createExtraOrdinaryCycle(
                  item,
                  index,
                  EpayrollDetails.BONUS,
                );
              },
            )
          : [],
      );
    }

    if (data.severancePaymentCycles) {
      extraordinary = extraordinary.concat(
        Object.entries(data.severancePaymentCycles).length > 0
          ? data.severancePaymentCycles.map((item: IEntry, index: string) => {
              return createExtraOrdinaryCycle(
                item,
                index,
                EpayrollDetails.SEVERANCE_PAY,
              );
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
                return createExtraOrdinaryCycle(
                  item,
                  index,
                  EpayrollDetails.BONUS,
                );
              },
            )
          : [],
      );
    }

    if (data.severanceCyclesIncluded) {
      extraordinary = extraordinary.concat(
        Object.entries(data.severanceCyclesIncluded).length > 0
          ? data.severanceCyclesIncluded.map((item: IEntry, index: string) => {
              return createExtraOrdinaryCycle(
                item,
                index,
                EpayrollDetails.SEVERANCE_PAY,
              );
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
                return createExtraOrdinaryCycle(
                  item,
                  index,
                  EpayrollDetails.BONUS,
                );
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
                return createExtraOrdinaryCycle(
                  item,
                  index,
                  EpayrollDetails.SEVERANCE_PAY,
                );
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
      const extraordinaryPayrollIncludedData = extraordinaryIncludedData();
      const extraordinaryPayrollEliminatedData = extraordinaryEliminatedData();

      if (
        key === EpayrollDetails.ORDINARY_PAYMENT &&
        ordinaryData.length === 0
      ) {
        return acc;
      }

      if (
        key === EpayrollDetails.EXTRAORDINARY_PAYMENT &&
        extraordinaryData.length === 0
      ) {
        return acc;
      }
      if (
        key === EpayrollDetails.ORDINARY_PAYMENT_INCLUDED &&
        ordinaryIncludedPayData.length === 0
      ) {
        return acc;
      }
      if (
        key === EpayrollDetails.ORDINARY_PAYMENT_REMOVED &&
        ordinaryPayEliminatedData.length === 0
      ) {
        return acc;
      }
      if (
        key === EpayrollDetails.EXTRAORDINARY_PAYMENT_INCLUDED &&
        extraordinaryPayrollIncludedData.length === 0
      ) {
        return acc;
      }
      if (
        key === EpayrollDetails.EXTRAORDINARY_PAYMENT_REMOVED &&
        extraordinaryPayrollEliminatedData.length === 0
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

  const title = `${detailsRequestInProgressModal.labelRequest} ${data.useCaseName}`;

  const screenTablet = useMediaQuery(mediaQueryTablet);

  useEffect(() => {
    const emitEvent = (eventName: string) => {
      eventBus.emit(eventName, showModal);
    };
    if (showModalReq && !showModal) {
      emitEvent(EModalState.SECOND_MODAL_STATE);
    } else if (!showModalReq && !showModal) {
      emitEvent(EModalState.SECOND_MODAL_STATE);
    } else if (!showModalReq && showModal) {
      emitEvent(EModalState.THIRD_MODAL_STATE);
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
