const withoutLastElements = (arr: Record<string, string>[], n: number) => {
  if (n <= 0) return [...arr];
  return arr.slice(0, -n);
};

export { withoutLastElements };
