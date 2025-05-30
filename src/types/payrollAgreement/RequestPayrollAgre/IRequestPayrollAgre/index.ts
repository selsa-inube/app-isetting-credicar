import { ISettingRequest } from "@ptypes/ISettingRequest";
import { IPayrollSpecialBenefitPayCycles } from "../IPayrollSpecialBenefitPayCycles";
import { ICompany } from "../ICompany";
import { IRegularPaymentCycles } from "../IRegularPaymentCycles";
import { ISeverancePaymentCycles } from "../ISeverancePaymentCycles";
import { IIncomeTypes } from "../IIncomeTypes";

interface IRequestPayrollAgre {
  abbreviatedName: string;
  payrollForDeductionAgreementType?: string;
  numberOfDaysForReceivingTheDiscounts?: number;
  payrollForDeductionAgreementCode?: string;
  payrollForDeductionAgreementId?: string;
  modifyJustification?: string;
  payingIdentification?: string;
  payingEntityName?: string;
  incomeTypes?: IIncomeTypes[];
  company?: ICompany[];
  payrollSpecialBenefitPaymentCycles?: IPayrollSpecialBenefitPayCycles[];
  regularPaymentCycles?: IRegularPaymentCycles[];
  severancePaymentCycles?: ISeverancePaymentCycles[];
  removalJustification?: string;
  settingRequest?: ISettingRequest;
  applicationDaysPayroll?: number;
}

export type { IRequestPayrollAgre };
