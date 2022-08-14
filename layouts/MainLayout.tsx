import { FC } from "react";
import Header from "../components/Header";
import { IMainLayoutProps } from "../models/MainLayoutModel";
import Footer from "../components/Footer";
import MainContainer from "../components/MainContainer";
import Head from "next/head";
import { useMediaQuery } from "@mantine/hooks";
import MobileHeader from "../components/MobileHeader";
import MobileNavigation from "../components/MobileNavigation";

const MainLayout: FC<IMainLayoutProps> = ({ children, title }) => {
  const mobile = useMediaQuery("(max-width: 576px)");
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {mobile ? <MobileHeader /> : <Header />}
      <MainContainer>{children}</MainContainer>
      {mobile ? <MobileNavigation /> : <Footer />}
    </>
  );
};

export default MainLayout;
