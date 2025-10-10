import { IRequestPayrollAgre } from "@ptypes/payrollAgreement/RequestPayrollAgre/IRequestPayrollAgre";

const mapAddPayrollnEntityToApi = (
  data: IRequestPayrollAgre,
): IRequestPayrollAgre => {
  return {
    abbreviatedName: data.abbreviatedName,
    payrollForDeductionAgreementType: data.payrollForDeductionAgreementType,
    numberOfDaysForReceivingTheDiscounts: Number(
      data.numberOfDaysForReceivingTheDiscounts,
    ),
    payingIdentification: data.payingIdentification,
    payingEntityName: data.payingEntityName,
    company: data.company,
    incomeTypes: data.incomeTypes,
    payrollSpecialBenefitPaymentCycles: data.payrollSpecialBenefitPaymentCycles,
    regularPaymentCycles: data.regularPaymentCycles,
    severancePaymentCycles: data.severancePaymentCycles,
    settingRequest: data.settingRequest,
    payrollForDeductionAgreementCode: data.payrollForDeductionAgreementCode,
  };
};

export { mapAddPayrollnEntityToApi };
