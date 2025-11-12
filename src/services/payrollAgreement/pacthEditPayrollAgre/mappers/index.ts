import { IRequestPayrollAgre } from "@ptypes/payrollAgreement/RequestPayrollAgre/IRequestPayrollAgre";

const mapEditPayrollnEntityToApi = (
  data: IRequestPayrollAgre,
): IRequestPayrollAgre => {
  return {
    abbreviatedName: data.abbreviatedName,
    payrollForDeductionAgreementType: data.payrollForDeductionAgreementType,
    numberOfDaysForReceivingTheDiscounts: Number(data.applicationDaysPayroll),
    payrollForDeductionAgreementCode: data.payrollForDeductionAgreementCode,
    incomeTypes: data.incomeTypes,
    payrollForDeductionAgreementId: data.payrollForDeductionAgreementId,
    payrollSpecialBenefitPaymentCycles: data.payrollSpecialBenefitPaymentCycles,
    regularPaymentCycles: data.regularPaymentCycles,
    severancePaymentCycles: data.severancePaymentCycles,
    modifyJustification: data.modifyJustification,
    settingRequest: data.settingRequest,
  };
};

export { mapEditPayrollnEntityToApi };
