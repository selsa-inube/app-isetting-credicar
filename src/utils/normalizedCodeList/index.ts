const normalizedCodeList = (
  value: string,
  listOfPossibleValues?: { id: string; label: string; value: string }[],
) => {
  return (
    listOfPossibleValues?.find((item) => item.label === value)?.id ?? value
  );
};

export { normalizedCodeList };
