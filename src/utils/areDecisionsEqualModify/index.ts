/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

const areDecisionsEqualModify = (dec1: any, dec2: any): boolean => {
  const { validUntil: _1, howToSetTheDecision: _2, ...obj1 } = dec1;
  const { validUntil: _3, howToSetTheDecision: _4, ...obj2 } = dec2;
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export { areDecisionsEqualModify };
