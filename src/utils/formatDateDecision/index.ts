const formatDateDecision = () => {
  const isValidDateFormat = (dateString: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return { isValidDateFormat, formatDate };
};

export { formatDateDecision };
