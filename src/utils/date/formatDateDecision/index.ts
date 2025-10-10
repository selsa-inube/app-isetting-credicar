const formatDateDecision = (value: string) => {
  const datePart = value.split("T")[0];
  return datePart;
};
export { formatDateDecision };
