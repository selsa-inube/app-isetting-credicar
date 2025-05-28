const goToEndPage = (
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  totalPages: number,
) => {
  setCurrentPage(totalPages);
};

export { goToEndPage };
