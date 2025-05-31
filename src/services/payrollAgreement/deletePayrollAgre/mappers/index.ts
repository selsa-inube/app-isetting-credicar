import { IRequestPayrollAgre } from "@ptypes/payrollAgreement/RequestPayrollAgre/IRequestPayrollAgre";

const mapDeletePayrollnEntityToApi = (
  data: IRequestPayrollAgre,
): IRequestPayrollAgre => {
  return {
    abbreviatedName: data.abbreviatedName,
    payrollForDeductionAgreementCode: data.payrollForDeductionAgreementCode,
    payrollForDeductionAgreementId: data.payrollForDeductionAgreementId,
    removalJustification: data.removalJustification,
    settingRequest: data.settingRequest,
  };
};

export { mapDeletePayrollnEntityToApi };
