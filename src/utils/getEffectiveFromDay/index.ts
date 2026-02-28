import { formatDateDecision } from "../formatDateDecision";

const getEffectiveFromDay = (dateString: string): string => {
  const { isValidDateFormat, formatDate } = formatDateDecision();

  const dateCurrent = formatDate(new Date());

  if (!isValidDateFormat(dateString)) {
    return dateCurrent;
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) {
    return dateCurrent;
  }

  const [cYear, cMonth, cDay] = dateCurrent.split("-").map(Number);
  const currentDate = new Date(cYear, cMonth - 1, cDay);

  if (date >= currentDate) {
    date.setDate(date.getDate() + 1);
    return formatDate(date);
  }

  return dateCurrent;
};

export { getEffectiveFromDay };
