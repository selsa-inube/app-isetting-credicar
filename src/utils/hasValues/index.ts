import { IExtraordinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryCyclesEntry";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";

const hasValues = (
  values: IOrdinaryCyclesEntry[] | IExtraordinaryCyclesEntry[],
) => values && values.length > 0;

export { hasValues };
