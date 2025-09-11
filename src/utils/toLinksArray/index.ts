const toLinksArray = (
  obj: Record<string, { id: string; label: string; path: string }>,
) => Object.values(obj);

export { toLinksArray };
