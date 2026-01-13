import { formatDateDecision } from "../formatDateDecision";

const getAfterDay = (dateString: string): string => {
  const { isValidDateFormat, formatDate } = formatDateDecision();
  if (!isValidDateFormat(dateString)) {
    return dateString;
  }

  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  date.setDate(date.getDate() - 1);

  return formatDate(date);
};

export { getAfterDay };
