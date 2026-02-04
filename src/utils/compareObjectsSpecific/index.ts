// eslint-disable-next-line @typescript-eslint/no-explicit-any
const compareObjectsSpecific = <T extends Record<string, any>>(
  arr1: T[],
  arr2: T[],
  excludeKeys: (keyof T)[] = [],
): boolean => {
  if (arr1 === undefined) {
    return false;
  }
  if (arr1.length !== arr2.length) return false;

  const filterKeys = (obj: T) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([key]) => !excludeKeys.includes(key as keyof T),
      ),
    );
  };

  return arr1.every((item1) => {
    return arr2.some((item2) => {
      return (
        JSON.stringify(filterKeys(item1)) === JSON.stringify(filterKeys(item2))
      );
    });
  });
};

export { compareObjectsSpecific };
