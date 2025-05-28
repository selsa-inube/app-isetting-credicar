import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";

const mapPayrollAgreementToEntity = (
  data: IPayrollAgreementData,
): IPayrollAgreementData => {
  const newData: IPayrollAgreementData = {
    id: String(data.payrollForDeductionAgreementId),
    abbreviatedName: String(data.abbreviatedName),
    legalPersonIdentification: String(data.legalPersonIdentification),
    legalPersonName: String(data.legalPersonName),
    numberOfDaysForReceivingTheDiscounts: Number(
      data.numberOfDaysForReceivingTheDiscounts,
    ),
    payrollForDeductionAgreementCode: String(
      data.payrollForDeductionAgreementCode,
    ),
    payrollForDeductionAgreementId: String(data.payrollForDeductionAgreementId),
    payrollForDeductionAgreementType: String(
      data.payrollForDeductionAgreementType,
    ),
    payrollSpecialBenefitPaymentCycles: Object(
      data.payrollSpecialBenefitPaymentCycles,
    ),
    regularPaymentCycles: Object(data.regularPaymentCycles),
    severancePaymentCycles: Object(data.severancePaymentCycles),
  };

  return newData;
};

export { mapPayrollAgreementToEntity };
