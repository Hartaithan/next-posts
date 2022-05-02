import clsx from "clsx";
import React from "react";
import { IContainerProps } from "../models/ContainerModel";

const MainContainer: React.FC<IContainerProps> = (props) => {
  const { children, grow } = props;
  return (
    <div
      className={clsx(
        grow && "flex-grow",
        "container max-w-7xl mx-auto my-4 px-2 sm:px-6 lg:px-8"
      )}
    >
      {children}
    </div>
  );
};

export default MainContainer;
