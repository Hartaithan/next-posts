import React from "react";
import MainContainer from "../components/MainContainer";
import Header from "../components/Header";
import { IMainLayoutProps } from "../models/MainLayoutModel";
import Footer from "../components/Footer";

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <MainContainer grow>{children}</MainContainer>
      <Footer />
    </>
  );
};

export default MainLayout;
