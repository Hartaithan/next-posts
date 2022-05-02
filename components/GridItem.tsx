import React from "react";
import { IGridItemProps } from "../models/GridModel";

const GridItem: React.FC<IGridItemProps> = (props) => {
  const { post } = props;
  return (
    <a href={post.href} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={post.src}
          alt="grid item"
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{post.name}</h3>
    </a>
  );
};

export default GridItem;
