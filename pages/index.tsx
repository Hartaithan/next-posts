import type { NextPage } from "next";
import MainLayout from "../layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout title={"Home"}>
      <h1>Hello world!</h1>
    </MainLayout>
  );
};

export default Home;
