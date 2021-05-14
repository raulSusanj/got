import React, { FC } from "react";

import "./ListItemAttribute.css";

interface IListItemAttribute {
  name: string;
  value: string | Element | JSX.Element | undefined;
}

export const ListItemAttribute: FC<IListItemAttribute> = ({
  name,
  value,
}) => {

  return (
    <p>
      <span className="item-attribute">{name}: </span> {value}
    </p>
  );
};
