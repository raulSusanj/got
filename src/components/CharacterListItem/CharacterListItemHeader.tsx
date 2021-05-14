import React, { FC } from "react";

interface ICharacterListItemHeader {
  fullName: string;
}

export const CharacterListItemHeader: FC<ICharacterListItemHeader> = ({ fullName }) => {
  const namseArray = fullName.trim().split(",");
  const otherNames = namseArray.length > 1 && namseArray.shift();
  const comma = otherNames ? ", " : "";

  return (
    <p>
      <span className="item-title">{namseArray[0] + comma} </span>
      {otherNames}
    </p>
  );
};
