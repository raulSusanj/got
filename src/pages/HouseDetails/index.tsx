import React from "react";
import { Link, useParams } from "react-router-dom";
import { useHouse } from "../../api";
import { Loader, Error, ListItemAttribute } from "../../components";
import { renderAttributeList } from "../../utils";

import "./HouseDetails.css";

const HouseDetails = () => {
  let { id } = useParams<{ id: string }>();
  const { house, isLoading, isError } = useHouse(id);

  if (isError) {
    return <Error />;
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

  function getOverlord(overlordUrl: string) {
    if (overlordUrl) {
      const overlordId = overlordUrl.replace(/[^1-9]/g, "");
      return (
        <span>
          Yes, (
          <Link className="link" to={`/house-details/${overlordId}`}>
            {overlordId}
          </Link>
          )
        </span>
      );
    } else {
      return "No";
    }
  }

  const attributes = [
    {
      name: "Name of the House",
      value: name,
    },
    {
      name: "Region",
      value: region ? region : "Unknown",
    },
    {
      name: "Coat of Arms",
      value: coatOfArms,
    },
    {
      name: "Words",
      value: words ? words : "Unknown",
    },
    {
      name: "Titles",
      value: renderAttributeList(titles),
    },
    {
      name: "Seats",
      value: renderAttributeList(seats),
    },
    {
      name: "Has died out",
      value: diedOut ? `Yes, at ${diedOut}` : "Unknown",
    },
    {
      name: "Has overlord",
      value: getOverlord(overlord),
    },
    {
      name: "Number of Cadet Branches",
      value: cadetBranches.length,
    },
  ];

  return (
    <div className="house-details-container">
      <div className="card-container">
        <h1 className="card-title">{attributes[0].value}</h1>
        {attributes.map((attribute, index) => {
          if (index !== 0) {
            return (
              <ListItemAttribute
                key={attribute.name}
                name={attribute.name}
                value={attribute.value}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default HouseDetails;
