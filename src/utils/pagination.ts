import { Pagination } from "../types";

const checkPrevieousePage = (
  currentPage: string,
  firstPage: string,
  lastPage: string,
  previousPage: string
) => {
  if (currentPage === firstPage) {
    return firstPage;
  } else if (currentPage === lastPage) {
    const decrementPage = parseInt(lastPage, 10) - 1;
    return decrementPage.toString();
  } else {
    return previousPage;
  }
};

const checkNextPage = (
  currentPage: string,
  lastPage: string,
  nextPage: string
) => {
  if (currentPage === lastPage) {
    return lastPage;
  } else {
    return nextPage;
  }
};

export const handlePagination = (
  link: string,
  currentPage: string
): Pagination => {
  const pagination: Pagination = {
    lastPage: "",
    firstPage: "",
    nextPage: "",
    previousPage: "",
  };
  const availablePages = link.match(/page=[0-9]+/g) || [];

  const pages = availablePages.map((availablePage: string) => {
    const numberOfPage = availablePage.replace(/page=/g, "");
    return numberOfPage;
  });
  const firstPage = pages[pages.length - 2];
  const lastPage = pages[pages.length - 1];
  pagination.lastPage = lastPage;
  pagination.firstPage = firstPage;
  pagination.nextPage = checkNextPage(currentPage, lastPage, pages[0]);

  pagination.previousPage = checkPrevieousePage(
    currentPage,
    firstPage,
    lastPage,
    pages[1]
  );
  return pagination;
};
