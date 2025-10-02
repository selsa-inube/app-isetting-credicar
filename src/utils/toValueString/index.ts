const toValueString = (value: unknown): string => {
  if (value == null) return "";

  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);

  if (Array.isArray(value)) return value.map(toValueString).join(",");

  if (typeof value === "object") {
    const valueRaw = value as Record<string, unknown>;
    const minRaw = valueRaw.min ?? valueRaw.from ?? valueRaw.start ?? null;
    const maxRaw = valueRaw.max ?? valueRaw.to ?? valueRaw.end ?? null;

    if (minRaw != null || maxRaw != null) {
      const minStr =
        typeof minRaw === "string" || typeof minRaw === "number"
          ? String(minRaw)
          : "";
      const maxStr =
        typeof maxRaw === "string" || typeof maxRaw === "number"
          ? String(maxRaw)
          : "";
      return `${minStr};${maxStr}`;
    }

    try {
      return JSON.stringify(value);
    } catch {
      return "";
    }
  }

  return "";
};

export { toValueString };
