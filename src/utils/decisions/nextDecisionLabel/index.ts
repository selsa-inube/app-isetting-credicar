const nextDecisionLabel = (used: Set<string>) => {
  let n = 1;
  while (used.has(`Decisión ${n}`)) n++;
  return `Decisión ${n}`;
};
export { nextDecisionLabel };