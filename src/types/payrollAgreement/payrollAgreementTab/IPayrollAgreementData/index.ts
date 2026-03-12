import { ISeverancePaymentCycles } from "../ISeverancePaymentCycles";
import { IPayrollSpecialBenefit } from "../IPayrollSpecialBenefit";
import { IRegularPaymentCycles } from "../IRegularPaymentCycles";
import { IIncomeTypes } from "@ptypes/payrollAgreement/RequestPayrollAgre/IIncomeTypes/index.ts";

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
  companySelected?: string;
  companyName?: string;
  companyTypeIdent?: string;
  companyNumberIdent?: string;
  companyNameCommercial?: string;
  companyComplement?: string;
  companyCity?: string;
  companyAddressRes?: string;
  companyCountry?: string;
  company?: {
    payingEntityName?: string;
    companyCountryIdent?: string;
    countryOfIdentityDocument?: string;
    countryTaxResidence?: string;
    headquarterAddress?: string;
    headquarterCity?: string;
    identificationDocumentNumber?: string;
    identificationTypeLegalPerson?: string;
    tradename?: string;
  };
}

export type { IPayrollAgreementData };
