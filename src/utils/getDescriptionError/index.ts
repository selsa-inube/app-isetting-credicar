const getDescriptionError = (response: string): string => {
  if (!response) {
    return "";
  }

  try {
    const { errors, i18n, description } = JSON.parse(response);
    const errorMessage = errors?.[0]?.message || "";
    const prefix = i18n || description || "";

    return prefix && errorMessage ? `${prefix} - ${errorMessage}` : prefix;
  } catch {
    return "";
  }
};

export { getDescriptionError };
