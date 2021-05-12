import React, { FC, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Character } from "../../types";

interface ICharacter {
  character: Character;
}

export const CharacterListItem: FC<ICharacter> = ({ character }) => {
  const { name, aliases, born, died, gender, culture, allegiances, books } =
    character;

  const [alive, setAlive] = useState<string>();
  const appearedInBooksCount = books && books.length;

  function transformYears(yearData: string) {
    const regex = /\d|\s(AC|BC|ac|bc)/g;
    let year: string | Array<string> | number | null;
    year = yearData.match(regex);

    if (!year) {
      return null;
    }
    const lastElement = year[year?.length - 1];

    if (lastElement === " BC") {
      year.pop();
      year = `-${year.join("")}`;
    } else {
      year.pop();
      year = `${year.join("")}`;
    }

    year = parseInt(year, 10);
    return year;
  }

  const calculateDeath = useCallback((born: string, died: string) => {
    let diedAt: string;
    const bornYear = transformYears(born);
    const diedYear = transformYears(died);
    if (typeof bornYear === "number" && typeof diedYear === "number") {
      const yearDifference = diedYear - bornYear;
      diedAt = yearDifference.toString();
      return `No, died at ${diedAt} years old`;
    } else {
      return null;
    }
  }, []);

  const checkAlive = useCallback(() => {
    if (!died) {
      setAlive("Yes");
    } else {
      const death = calculateDeath(born, died);
      if (death) {
        setAlive(death);
      } else {
        setAlive("n/a");
      }
    }
  }, [calculateDeath, born, died]);

  useEffect(() => {
    checkAlive();
  }, [checkAlive]);

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
      name = "n/a";
    }

    if (name.charAt(name.length - 2) === ",") {
      name = name.slice(0, -2);
    }

    return name;
  }

  function getAllegianceId(allegiancesUrl: string) {
    return allegiancesUrl.replace(/[^1-9]/g, "");
  }

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
                <Link to={`/house-details/${allegianceId}`}>
                  {allegianceId}
                </Link>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <div>
      <p>Name: {concatNames(aliases, name)}</p>
      <p>Alive: {alive}</p>
      <p>Gender: {gender ? gender : "Unknown"}</p>
      <p>Culture: {culture ? culture : "Unknown"}</p>
      <div>Allegiances: {getAllegiances()}</div>
      <p>
        <i>
          Appeared in {appearedInBooksCount} book
          {appearedInBooksCount > 1 && `s`}.
        </i>
      </p>
      <hr />
    </div>
  );
};
