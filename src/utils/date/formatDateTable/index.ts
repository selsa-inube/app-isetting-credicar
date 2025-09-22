import { capitalizeText } from "@utils/capitalizeText";

const formatDateTable = (date: Date, time?: boolean) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false,
  };

  const dateString = date.toLocaleDateString("es-ES", dateOptions);
  const timeString = date.toLocaleTimeString("es-ES", timeOptions);

  const [day, month, year] = dateString.split(" ");
  const dateFormat = `${day}/${capitalizeText(month)}/${year}`;

  if (time) {
    return `${dateFormat} - ${timeString}`;
  }

  return dateFormat;
};

export { formatDateTable };
