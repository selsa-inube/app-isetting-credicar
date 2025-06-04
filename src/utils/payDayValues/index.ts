const payDayValues = (periodicity: string, payDay: string) => {
  const everyTen = Number(payDay) + 10;

  switch (periodicity) {
    case "Weekly":
      return payDay;
    case "Intervals_10_days":
      return `${payDay}, ${everyTen}, ${Number(everyTen) + 10}`;
    case "Biweekly":
      return `${payDay}, ${Number(payDay) + 15}`;
    case "Monthly":
      return payDay;
    case "Semimonthly":
      return payDay;
    default:
      return payDay;
  }
};

export { payDayValues };
