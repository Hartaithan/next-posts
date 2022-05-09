import { FC } from "react";
import Header from "../components/Header";
import { IMainLayoutProps } from "../models/MainLayoutModel";
import Footer from "../components/Footer";
import MainContainer from "../components/MainContainer";
import Head from "next/head";

const MainLayout: FC<IMainLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  );
};

export default MainLayout;
