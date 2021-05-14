import React, { FC, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { transformBcAcYears } from "../../utils";
import { Character } from "../../types";
import { CharacterListItemHeader } from "./CharacterListItemHeader";
import { ListItemAttribute } from "../ListItemAttribute";

import "./CharacterListItem.css";

interface ICharacter {
  character: Character;
}

/**
 * TODO: We could also deconstruct all characters props, but maybe we will implement
 * some additional props not related to the character inside this component
 */
export const CharacterListItem: FC<ICharacter> = ({ character }) => {
  const { name, aliases, born, died, gender, culture, allegiances, books } =
    character;

  const [alive, setAlive] = useState<string>();
  const appearedInBooksCount = books && books.length;

  //Calculates when someone died
  const calculateDeath = useCallback((born: string, died: string) => {
    let diedAt: string;
    const bornYear = transformBcAcYears(born);
    const diedYear = transformBcAcYears(died);

    if (typeof bornYear === "number" && typeof diedYear === "number") {
      const yearDifference = diedYear - bornYear;
      diedAt = yearDifference.toString();
      return `No, died at ${diedAt} years old`;
    } else {
      return null;
    }
  }, []);

  //Checks if someone is dead or alive
  const checkAlive = useCallback(() => {
    if (!died) {
      setAlive("Yes");
    } else {
      const death = calculateDeath(born, died);
      if (death) {
        setAlive(death);
      } else {
        setAlive("Unknown");
      }
    }
  }, [calculateDeath, born, died]);

  useEffect(() => {
    checkAlive();
  }, [checkAlive]);

  //Concats name and aliases
  function concatNames(aliases?: Array<string>, characterName?: string) {
    let name;

    if (characterName && aliases?.length) {
      name = [characterName, ...aliases].join(", ");
    } else if (characterName && !aliases?.length) {
      name = characterName;
    } else if (!characterName && aliases?.length) {
      if (aliases.length > 1) {
        name = aliases.join();
      } else {
        name = aliases[0];
      }
    } else {
      name = "Unknown";
    }

    if (name.charAt(name.length - 2) === ",") {
      name = name.slice(0, -2);
    }

    return name;
  }

  //Extracts the allegiance id from allegiance url
  function getAllegianceId(allegiancesUrl: string) {
    return allegiancesUrl.replace(/[^1-9]/g, "");
  }

  //Renders allegiances if exist with link to house details
  const getAllegiances = () => {
    if (!allegiances.length) {
      return "No allegiances";
    } else {
      return (
        <ul>
          {allegiances.map((allegiance) => {
            const allegianceId = getAllegianceId(allegiance);
            return (
              <li key={allegianceId}>
                <Link className="link" to={`/house-details/${allegianceId}`}>
                  {allegianceId}
                </Link>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  //Sums up all character attributes for rendering
  const attributes = [
    {
      name: "Alive",
      value: alive,
    },
    {
      name: "Gender",
      value: gender ? gender : "Unknown",
    },
    {
      name: "Culture",
      value: culture ? culture : "Unknown",
    },
    {
      name: "Allegiances",
      value: getAllegiances(),
    },
  ];

  return (
    <div className="item-container">
      <CharacterListItemHeader fullName={concatNames(aliases, name)} />
      {attributes.map((attribute) => (
        <ListItemAttribute
          key={attribute.name}
          name={attribute.name}
          value={attribute.value}
        />
      ))}

      <p>
        <i>
          Appeared in {appearedInBooksCount} book
          {appearedInBooksCount > 1 && `s`}.
        </i>
      </p>
    </div>
  );
};
