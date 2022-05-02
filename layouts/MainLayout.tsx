import React from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import { IMainLayoutProps } from "../models/MainLayoutModel";

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default MainLayout;
