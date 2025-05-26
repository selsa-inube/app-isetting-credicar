import { IIncomeTypes } from "@ptypes/payrollAgreement/RequestPayrollAgre/IIncomeTypes";

const getSourcesIncome = (incomeTypesData?: IIncomeTypes[]) => {
  const incomeTypes = Array.isArray(incomeTypesData) ? incomeTypesData : [];
  const incomeTypesValues: string[] = [];

  incomeTypes.forEach((item) => {
    if (item.incomeType) {
      incomeTypesValues.push(item.incomeType);
    }
  });

  return incomeTypesValues.join(",").trim();
};

export { getSourcesIncome };
