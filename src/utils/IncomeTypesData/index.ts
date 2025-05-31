const getIncomeTypesData = (value: string) => {
  const incomeTypes = value;
  const incomeTypesArray = incomeTypes.split(",");
  return incomeTypesArray.map((item) => {
    return {
      incomeType: item,
    };
  });
};

export { getIncomeTypesData };
