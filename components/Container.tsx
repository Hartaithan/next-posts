import React from "react";
import { IContainerProps } from "../models/ContainerModel";

const Container: React.FC<IContainerProps> = (props) => {
  const { children } = props;
  return (
    <div className="container max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;
