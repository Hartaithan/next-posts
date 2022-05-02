import React from "react";
import MainContainer from "../components/MainContainer";
import Header from "../components/Header";
import { IMainLayoutProps } from "../models/MainLayoutModel";

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <MainContainer grow>{children}</MainContainer>
    </>
  );
};

export default MainLayout;
