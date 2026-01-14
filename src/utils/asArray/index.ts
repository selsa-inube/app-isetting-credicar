/* eslint-disable @typescript-eslint/no-explicit-any */
const asArray = (items: unknown): any[] =>
  Array.isArray(items)
    ? items
    : items && typeof items === "object"
      ? Object.values(items as Record<string, unknown>)
      : [];

export { asArray };
