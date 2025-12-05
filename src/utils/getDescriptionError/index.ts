const getDescriptionError = (response: string) => {
  if (!response) {
    return undefined;
  }
  const responseObject = JSON.parse(response);
  if (responseObject.i18n) {
    return responseObject.i18n;
  }
  return responseObject.description;
};

export { getDescriptionError };
