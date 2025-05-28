const getPagination = (
  currentPage: number,
  pageLength: number,
  totalEntries: number,
) => {
  const totalPages = Math.ceil(totalEntries / pageLength);
  const firstEntry = (currentPage - 1) * pageLength;
  const lastEntry = Math.min(firstEntry + pageLength, totalEntries);

  return {
    totalPages,
    firstEntry,
    lastEntry,
  };
};

export { getPagination };
