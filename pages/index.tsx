import type { NextPage } from "next";
import MainLayout from "../layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </MainLayout>
  );
};

export default Home;
