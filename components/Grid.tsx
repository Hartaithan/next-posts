import React from "react";
import { IGridProps } from "../models/GridModel";

const Grid: React.FC<IGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {children}
    </div>
  );
};

export default Grid;
