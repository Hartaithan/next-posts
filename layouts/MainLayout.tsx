import React from "react";
import Header from "../components/Header";
import { IMainLayoutProps } from "../models/MainLayoutModel";
import Footer from "../components/Footer";
import MainContainer from "../components/MainContainer";

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  );
};

export default MainLayout;
