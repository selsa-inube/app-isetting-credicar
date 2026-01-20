/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const areDecisionsEqualModify = (dec1: any, dec2: any): boolean => {
  const { validUntil: _, ...obj1 } = dec1;
  const { validUntil: __, ...obj2 } = dec2;
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export { areDecisionsEqualModify };
