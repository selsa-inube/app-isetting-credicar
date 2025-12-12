const getDescriptionError = (response: string): string => {
  if (!response) {
    return "";
  }
  const responseObject = JSON.parse(response);
  if (responseObject.i18n) {
    return `${responseObject.i18n} - ${responseObject.errors[0].message ?? ""}`;
  }
  return `${responseObject.description} - ${responseObject.errors[0].message ?? ""}`;
};

export { getDescriptionError };
