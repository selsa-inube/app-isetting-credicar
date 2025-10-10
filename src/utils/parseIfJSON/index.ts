// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseIfJSON = (data: any) => {
  if (typeof data === "string") {
    const firstChar = data.trim()[0];

    if (firstChar === "{" || firstChar === "[") {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  return data;
};

export { parseIfJSON };
