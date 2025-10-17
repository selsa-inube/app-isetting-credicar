const formatRangeValue = (v: unknown): string => {
  if (v == null) return "";

  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "true" : "false";

  if (Array.isArray(v)) return v.map(formatRangeValue).join(", ");

  if (typeof v === "object" && v !== null) {
    const range = v as { from?: unknown; to?: unknown };
    const from = formatRangeValue(range.from);
    const to = formatRangeValue(range.to);

    if (from && to) return `De ${from} a ${to}`;
    if (from) return from;
    if (to) return to;

    try {
      return JSON.stringify(v);
    } catch {
      return "[objeto]";
    }
  }

  return "";
};

export { formatRangeValue };
