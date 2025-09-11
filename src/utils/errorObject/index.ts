const errorObject = (error: unknown) => {
  const cleanedString = String(error)
    .replace(/^Error:\s*/g, "")
    .replace(/Error:\s*/g, "");
  return JSON.parse(cleanedString);
};

export { errorObject };
