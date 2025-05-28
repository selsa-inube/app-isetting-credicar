const findCurrentMediaQuery = (media: Record<string, boolean>) => {
  const lastIndex = Object.values(media).lastIndexOf(true);
  return lastIndex !== -1 ? lastIndex : 0;
};
export { findCurrentMediaQuery };
