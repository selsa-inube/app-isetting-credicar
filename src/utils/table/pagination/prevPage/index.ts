const prevPage = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};
export { prevPage };
