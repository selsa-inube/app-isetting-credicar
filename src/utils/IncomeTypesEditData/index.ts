const getIncomeTypesEditData = (
  newValues: string[],
  payrollId: string,
  operation: string,
) => {
  return newValues.map((item) => {
    return {
      incomeType: item,
      payrollForDeductionAgreementId: payrollId,
      transactionOperation: operation,
    };
  });
};

export { getIncomeTypesEditData };
