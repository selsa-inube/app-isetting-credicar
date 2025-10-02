/* eslint-disable @typescript-eslint/no-explicit-any */
const asArray = (v: unknown): any[] =>
  Array.isArray(v)
    ? v
    : v && typeof v === "object"
      ? Object.values(v as Record<string, unknown>)
      : [];

export { asArray };
