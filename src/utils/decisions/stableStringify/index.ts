/* eslint-disable @typescript-eslint/no-explicit-any */
const stableStringify = (v: unknown) => {
  const seen = new WeakSet();
  return JSON.stringify(v, (_k, val) => {
    if (val && typeof val === "object") {
      if (seen.has(val)) return;
      seen.add(val);
      if (!Array.isArray(val)) {
        return Object.keys(val)
          .sort()
          .reduce((o: any, k) => ((o[k] = val[k]), o), {});
      }
    }
    return val;
  });
};

export { stableStringify };
