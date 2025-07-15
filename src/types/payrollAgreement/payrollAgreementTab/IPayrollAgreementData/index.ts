import { ISeverancePaymentCycles } from "../ISeverancePaymentCycles";
import { IPayrollSpecialBenefit } from "../IPayrollSpecialBenefit";
import { IRegularPaymentCycles } from "../IRegularPaymentCycles";
import { IIncomeTypes } from "../../RequestPayrollAgre/IIncomeTypes";

interface IPayrollAgreementData {
  abbreviatedName: string;
  payingIdentification: string;
  payingEntityName: string;
  numberOfDaysForReceivingTheDiscounts: number;
  payrollForDeductionAgreementCode: string;
  payrollForDeductionAgreementId: string;
  payrollForDeductionAgreementType: string;
  payrollSpecialBenefitPaymentCycles: IPayrollSpecialBenefit[];
  regularPaymentCycles: IRegularPaymentCycles[];
  severancePaymentCycles: ISeverancePaymentCycles[];
  id?: string;
  incomeTypes?: IIncomeTypes[];
  code?: string;
}

export type { IPayrollAgreementData };
