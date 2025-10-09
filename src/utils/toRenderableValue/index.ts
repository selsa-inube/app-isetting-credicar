const toRenderableValue = (v: unknown): string | number => {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return v;
  if (typeof v === "boolean") return v ? "true" : "false";
  if (Array.isArray(v)) return v.map(toRenderableValue).join(", ");

  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    const a = (o.from ?? o.min ?? o.start ?? "") as string | number;
    const b = (o.to ?? o.max ?? o.end ?? "") as string | number;
    if (a !== "" || b !== "") {
      const left = a !== "" ? String(a) : "";
      const right = b !== "" ? String(b) : "";
      return right ? `De ${left} a ${right}` : left;
    }
    try {
      return JSON.stringify(o);
    } catch {
      return "[object]";
    }
  }

  try {
    return JSON.stringify(v);
  } catch {
    return "[object]";
  }
};

export { toRenderableValue };
