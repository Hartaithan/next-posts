import React from "react";
import Header from "../components/Header";
import { IMainLayoutProps } from "../models/MainLayoutModel";
import Footer from "../components/Footer";

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
