const getIncomeTypesEditData = (
  newValues: string[],
  payrollId: string,
  operation: string,
  option: boolean,
) => {
  return newValues.map((item) => {
    return {
      incomeType: item,
      payrollForDeductionAgreementId: payrollId,
      ...(!option && { transactionOperation: operation }),
    };
  });
};

export { getIncomeTypesEditData };
