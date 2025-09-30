const asArray = (items: unknown): unknown[] =>
  Array.isArray(items)
    ? items
    : items && typeof items === "object"
      ? Object.values(items as Record<string, unknown>)
      : [];

export { asArray };
