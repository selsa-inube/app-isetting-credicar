import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { eventBus } from "@events/eventBus";
import { formatDateTable } from "@utils/date/formatDateTable";
import { mediaQueryMobile } from "@config/environment";
import { TransactionOperation } from "@enum/transactionOperation";
import { normalizeEnumName } from "@utils/normalizeEnumName";
import { IUseDetailsRequestInProgress } from "@ptypes/hooks/payrollAgreement/IUseDetailsRequestInProgress";
import { IEntry } from "@ptypes/design/table/IEntry";

const useDetailsRequestInProgress = (props: IUseDetailsRequestInProgress) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const normalizeData = {
    ...data,
    id: data.id,
    request: data.useCaseName,
    responsable: "",
    dateExecution: data.requestDate,
    payrollForDeductionAgreementType: normalizeEnumName(
      data.configurationRequestData.payrollForDeductionAgreementType,
    ),
    numberOfDaysForReceivingTheDiscounts:
      data.configurationRequestData.numberOfDaysForReceivingTheDiscounts ??
      data.configurationRequestData.applicationDaysPayroll,
    payingEntityName: data.configurationRequestData.payingEntityName,
    status: data.requestStatus,
    traceability: data.configurationRequestsTraceability.map(
      (traceability: IEntry) => ({
        dateExecution: formatDateTable(new Date(traceability.executionDate)),
        actionExecuted: traceability.actionExecuted,
        userWhoExecuted: traceability.userWhoExecutedAction,
        description: traceability.description,
      }),
    ),
    sourcesOfIncome: data.configurationRequestData.sourcesOfIncome,
    regularPaymentCycles: [],
    payrollSpecialBenefitPaymentCycles: [],
    severancePaymentCycles: [],
    regularCyclesEliminated: [],
    regularCyclesIncluded: [],
    payrollSpecialBenCyclesIncluded: [],
    severanceCyclesIncluded: [],
    payrollSpecialBenCyclesEliminated: [],
    severanceCyclesEliminated: [],
  };

  if (
    data.useCaseName === "AddPayrollAgreement" &&
    data.configurationRequestData.regularPaymentCycles
  ) {
    normalizeData.regularPaymentCycles =
      data.configurationRequestData.regularPaymentCycles;
  }

  if (
    data.useCaseName !== "AddPayrollAgreement" &&
    data.configurationRequestData.regularPaymentCycles
  ) {
    normalizeData.regularCyclesIncluded =
      data.configurationRequestData.regularPaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === TransactionOperation.INSERT,
      );
    normalizeData.regularCyclesEliminated =
      data.configurationRequestData.regularPaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === TransactionOperation.DELETE,
      );
  }
  if (
    data.useCaseName === "AddPayrollAgreement" &&
    data.configurationRequestData.payrollSpecialBenefitPaymentCycles
  ) {
    normalizeData.payrollSpecialBenefitPaymentCycles =
      data.configurationRequestData.payrollSpecialBenefitPaymentCycles;
  }

  if (data.configurationRequestData.payrollSpecialBenefitPaymentCycles) {
    normalizeData.payrollSpecialBenCyclesIncluded =
      data.configurationRequestData.payrollSpecialBenefitPaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === TransactionOperation.INSERT,
      );
    normalizeData.payrollSpecialBenCyclesEliminated =
      data.configurationRequestData.payrollSpecialBenefitPaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === TransactionOperation.DELETE,
      );
  }

  if (
    data.useCaseName === "AddPayrollAgreement" &&
    data.configurationRequestData.severancePaymentCycles
  ) {
    normalizeData.severancePaymentCycles =
      data.configurationRequestData.severancePaymentCycles;
  }

  if (data.configurationRequestData.severancePaymentCycles) {
    normalizeData.severanceCyclesIncluded =
      data.configurationRequestData.severancePaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === TransactionOperation.INSERT,
      );

    normalizeData.severanceCyclesEliminated =
      data.configurationRequestData.severancePaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === TransactionOperation.DELETE,
      );
  }

  useEffect(() => {
    eventBus.emit("secondModalState", showModal);
  }, [showModal]);

  const screenTablet = useMediaQuery("(max-width: 1200px)");
  const isMobile = useMediaQuery(mediaQueryMobile);

  return {
    showModal,
    screenTablet,
    isMobile,
    handleToggleModal,
    normalizeData,
  };
};

export { useDetailsRequestInProgress };
