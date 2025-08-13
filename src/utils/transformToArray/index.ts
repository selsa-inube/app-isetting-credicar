const transformToArray = <T>(
  val: readonly T[] | Record<string, T> | null | undefined,
): T[] => {
  if (val == null) return [];
  return Array.isArray(val) ? Array.from(val) : Object.values(val);
};

export { transformToArray };
