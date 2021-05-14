import React, { useState, useEffect } from "react";

import { useCharacters } from "../../api";
import {
  Loader,
  Error,
  CharacterListItem,
  Selector,
  SubmitInput,
  PaginationBar,
} from "../../components";
import { handlePagination } from "../../utils";
import { Character } from "../../types";
import "./Characters.css";

const Characters = () => {
  const genderSelections = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Unknown",
      value: "Unknown",
    },
  ];
  const pageSizes = [
    {
      label: "2",
      value: 2,
    },
    {
      label: "10",
      value: 10,
    },
    {
      label: "25",
      value: 25,
    },
    {
      label: "50",
      value: 50,
    },
  ];

  const pageCoordinations = [
    {
      name: "<< First page",
      value: "firstPage",
    },
    {
      name: "< Previous page",
      value: "previousPage",
    },
    {
      name: "Next page >",
      value: "nextPage",
    },
    {
      name: "Last page >>",
      value: "lastPage",
    },
  ];

  const [page, setPage] = useState<string>("1");
  const [pageSize, setPageSize] = useState<number>(pageSizes[0].value);
  const [culture, setCulture] = useState<string>("");
  const [filters, setFilters] = useState<any>({
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
      const newPagination = handlePagination(link, page);
      setPagination({ ...newPagination });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link, setPage, page, filters, pageSize]);

  if (isError) {
    return <Error />;
  }
  if (isLoading) return <Loader />;

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
    <div className="container">
      <h1 className="page-title">Table of Characters</h1>
      <div className="filter-container">
        <div className="filter-item-container">
          <label>Gender: </label>
          <Selector
            value={filters.gender}
            onChange={onChangeGender}
            options={genderSelections}
          />
          <SubmitInput
            value={culture}
            onChange={onChangeCulture}
            placeholder="Enter culture"
            submitLabel="Filter"
            onSubmit={submitCultureFilter}
          />
        </div>

        <div className="filter-item-container">
          <label>Page size: </label>
          <Selector
            value={pageSize}
            onChange={onChangePageSize}
            options={pageSizes}
          />
        </div>
      </div>

      <div className="character-table">
        {characters.length &&
          characters.map((character: Character, index: number) => {
            return (
              // TODO: Replace key value with some id if exits
              <CharacterListItem key={index.toString()} character={character} />
            );
          })}
      </div>
     <PaginationBar coordinations={pageCoordinations} onClick={onChangePage} />
    </div>
  );
};

export default Characters;
