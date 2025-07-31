/* eslint-disable @typescript-eslint/no-explicit-any */
const transformKeysToLowerFirst = (
  values: string | number | undefined | Record<string, any>,
): string | Record<string, any> => {
  if (typeof values === "string") {
    return values;
  }

  if (!values || typeof values !== "object") {
    return {};
  }

  if (Array.isArray(values)) {
    return values;
  }

  const result: Record<string, any> = {};

  for (const key in values) {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      const newKey = key.charAt(0).toLowerCase() + key.slice(1);
      result[newKey] = values[key];
    }
  }

  return result;
};

export { transformKeysToLowerFirst };
