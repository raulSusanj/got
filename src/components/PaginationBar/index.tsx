import React, { FC } from "react";

import { Button } from "../";
import './PaginationBar.css';

interface ICoordination {
  value: string;
  name: string;
}

interface IPaginationBar {
  coordinations: Array<ICoordination>;
  onClick: (event: any) => void;
}

export const PaginationBar: FC<IPaginationBar> = ({
  coordinations,
  onClick,
}) => {
  return (
    <div className="pagination-container">
      {coordinations.map((cordination: ICoordination) => (
        <Button
          label={cordination.name}
          value={cordination.value}
          onClick={onClick}
          variant="secondary"
          style={{margin: '0 8px'}}
        />
      ))}
    </div>
  );
};
