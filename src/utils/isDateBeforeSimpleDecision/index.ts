const isDateBeforeSimple = (
  inputDate: string,
  existingDate: string,
): boolean => {
  const isValidDateFormat = (dateString: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  };
  if (!isValidDateFormat(inputDate) || !isValidDateFormat(existingDate)) {
    return false;
  }

  return inputDate < existingDate;
};

export { isDateBeforeSimple };
