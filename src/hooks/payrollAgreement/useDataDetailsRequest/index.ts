import { ETransactionOperation } from "@enum/transactionOperation";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { formatDateTable } from "@utils/date/formatDateTable";
import { normalizeEnumName } from "@utils/normalizeEnumName";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IUseDataDetails } from "@ptypes/hooks/payrollAgreement/IUseDataDetails";

const useDataDetailsRequest = (props: IUseDataDetails) => {
  const { data } = props;
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
    data.useCaseName === EPayrollAgreement.USE_CASE_ADD &&
    data.configurationRequestData.regularPaymentCycles
  ) {
    normalizeData.regularPaymentCycles =
      data.configurationRequestData.regularPaymentCycles;
  }

  if (
    data.useCaseName !== EPayrollAgreement.USE_CASE_ADD &&
    data.configurationRequestData.regularPaymentCycles
  ) {
    normalizeData.regularCyclesIncluded =
      data.configurationRequestData.regularPaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === ETransactionOperation.INSERT,
      );
    normalizeData.regularCyclesEliminated =
      data.configurationRequestData.regularPaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === ETransactionOperation.DELETE,
      );
  }
  if (
    data.useCaseName === EPayrollAgreement.USE_CASE_ADD &&
    data.configurationRequestData.payrollSpecialBenefitPaymentCycles
  ) {
    normalizeData.payrollSpecialBenefitPaymentCycles =
      data.configurationRequestData.payrollSpecialBenefitPaymentCycles;
  }

  if (data.configurationRequestData.payrollSpecialBenefitPaymentCycles) {
    normalizeData.payrollSpecialBenCyclesIncluded =
      data.configurationRequestData.payrollSpecialBenefitPaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === ETransactionOperation.INSERT,
      );
    normalizeData.payrollSpecialBenCyclesEliminated =
      data.configurationRequestData.payrollSpecialBenefitPaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === ETransactionOperation.DELETE,
      );
  }

  if (
    data.useCaseName === EPayrollAgreement.USE_CASE_ADD &&
    data.configurationRequestData.severancePaymentCycles
  ) {
    normalizeData.severancePaymentCycles =
      data.configurationRequestData.severancePaymentCycles;
  }

  if (data.configurationRequestData.severancePaymentCycles) {
    normalizeData.severanceCyclesIncluded =
      data.configurationRequestData.severancePaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === ETransactionOperation.INSERT,
      );

    normalizeData.severanceCyclesEliminated =
      data.configurationRequestData.severancePaymentCycles.filter(
        (item: IEntry) =>
          item.transactionOperation === ETransactionOperation.DELETE,
      );
  }

  return { normalizeData };
};

export { useDataDetailsRequest };
