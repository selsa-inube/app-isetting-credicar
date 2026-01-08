const getNextDay = (dateString: string): string => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  const [year, month, day] = dateString.split("-").map(Number);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return dateString;
  }

  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + 1);

  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, "0");
  const nextDay = String(date.getDate()).padStart(2, "0");

  const result = `${nextYear}-${nextMonth}-${nextDay}`;

  return result;
};

export { getNextDay };
