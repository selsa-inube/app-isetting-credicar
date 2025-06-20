const nextPage = (
  currentPage: number,
  totalPages: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (currentPage !== totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

export { nextPage };
