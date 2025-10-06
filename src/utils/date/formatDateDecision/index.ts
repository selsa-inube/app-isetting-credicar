const formatDateDecision = (value: string) => {
  const [year, month, day] = value.split("-");

  return `${year}-${month}-${day}`;
};
export { formatDateDecision };
