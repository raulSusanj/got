import React from "react";
import { Link, useParams } from "react-router-dom";
import { useHouse } from "../api";
import { Loader } from "../components";

const HouseDetails = () => {
  let { id } = useParams<{ id: string }>();
  const { house, isLoading, isError } = useHouse(id);

  if (isError) {
    return <div>Failed to load</div>;
  }
  if (isLoading) return <Loader />;

  const {
    name,
    region,
    coatOfArms,
    words,
    titles,
    seats,
    diedOut,
    overlord,
    cadetBranches,
  } = house;

  const renderList = (items: Array<string>) => {
    if (items.length && items[0]) {
      return (
        <ul>
          {items.map((item: string) => (
            <li>{item}</li>
          ))}
        </ul>
      );
    } else {
      return <span>Unknown</span>;
    }
  };

  function getOverlordId(overlordUrl: string) {
    const overlordId = overlordUrl.replace(/[^1-9]/g, "");
    return <Link to={`/house-details/${overlordId}`}>{overlordId}</Link>;
  }

  return (
    <div>
      <h2>HouseDetails</h2>
      <p>Name of the House: {name}</p>
      <p>Region: {region ? region : "Unknown"}</p>
      <p>Coat of Arms: {coatOfArms}</p>
      <p>Words: {words ? words : "Unknown"}</p>
      <div>Titles: {renderList(titles)}</div>
      <p>Seats: {renderList(seats)}</p>
      <p>Has died out: {diedOut ? `Yes, at ${diedOut}` : "Unknown"}</p>
      <p>
        Has overlord:
        {overlord ? (
          <span>
            {" "}Yes, (<span>{getOverlordId(overlord)})</span>
          </span>
        ) : (
          "No"
        )}
      </p>
      <p>Number of Cadet Branches: {cadetBranches.length}</p>
    </div>
  );
};

export default HouseDetails;
