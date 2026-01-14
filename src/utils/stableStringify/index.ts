const stableStringify = (v: unknown) => {
  const seen = new WeakSet();
  return JSON.stringify(v, (_k, val) => {
    if (val && typeof val === "object") {
      if (seen.has(val)) return;
      seen.add(val);
      if (!Array.isArray(val)) {
        return Object.keys(val)
          .sort()
          .reduce<Record<string, unknown>>((o, k) => {
            o[k] = (val as Record<string, unknown>)[k];
            return o;
          }, {});
      }
    }
    return val;
  });
};

export { stableStringify };
