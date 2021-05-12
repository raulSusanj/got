import React, { useState, useEffect } from "react";

import { useCharacters } from "../api";
import { Loader, CharacterListItem } from "../components";
import { Character } from "../types";

const Characters = () => {
  const genderSelections = ["Male", "Female", "Unknown"];
  const pageSizes = [2, 10, 25, 50];

  const [page, setPage] = useState<string>("1");
  const [pageSize, setPageSize] = useState(pageSizes[1]);
  const [culture, setCulture] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    culture: "",
  });
  const [pagination, setPagination] = useState<any>({
    firstPage: "",
    lastPage: "",
    previousPage: "",
    nextPage: "",
  });

  const { characters, isLoading, isError, link } = useCharacters({
    ...filters,
    pageSize,
    page,
  });

  useEffect(() => {
    if (link) {
      handlePagination();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link, setPage, page, filters, pageSize]);

  if (isError) {
    return <div>Failed to load</div>;
  }
  if (isLoading) return <Loader />;

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

  const handlePagination = () => {
    const availablePages = link.match(/page=[0-9]+/g);

    const pages = availablePages.map((availablePage: string) => {
      const numberOfPage = availablePage.replace(/page=/g, "");
      return numberOfPage;
    });
    const firstPage = pages[pages.length - 2];
    const lastPage = pages[pages.length - 1];
    pagination.lastPage = lastPage;
    pagination.firstPage = firstPage;
    pagination.nextPage = pages[0];

    pagination.previousPage = checkPrevieousePage(
      page,
      firstPage,
      lastPage,
      pages[1]
    );
    setPagination({ ...pagination });
  };

  const onChangeGender = (event: any) => {
    filters.gender = event.target.value;
    setFilters({ ...filters });
  };

  const onChangeCulture = (event: any) => {
    setCulture(event.target.value);
  };

  const submitCultureFilter = () => {
    filters.culture = culture;
    setFilters({ ...filters });
  };

  const onChangePageSize = (event: any) => {
    setPageSize(event.target.value);
  };

  const onChangePage = (event: any) => {
    setPage(pagination[`${event.target.value}`]);
  };

  return (
    <div>
      <h2>Characters</h2>
      <select value={filters.gender} onChange={onChangeGender}>
        <option value="">All</option>
        {genderSelections.map((genderSelection) => (
          <option
            key={genderSelection}
            value={genderSelection}
            disabled={filters.gender === genderSelection}
          >
            {genderSelection}
          </option>
        ))}
      </select>
      <input
        placeholder="Enter culture"
        value={culture}
        onChange={onChangeCulture}
      />
      <button onClick={submitCultureFilter}>Filter</button>

      <select value={pageSize} onChange={onChangePageSize}>
        {pageSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <ul>
        {characters.length &&
          characters.map((character: Character, index: number) => {
            return (
              // TODO: Replace key value with some id if exits
              <CharacterListItem key={index.toString()} character={character} />
            );
          })}
      </ul>
      <div>
        <button value="firstPage" onClick={onChangePage}>
          First page
        </button>
        <button value="previousPage" onClick={onChangePage}>
          Previous page
        </button>
        <button value="nextPage" onClick={onChangePage}>
          Next page
        </button>
        <button value="lastPage" onClick={onChangePage}>
          Last page
        </button>
      </div>
    </div>
  );
};

export default Characters;
