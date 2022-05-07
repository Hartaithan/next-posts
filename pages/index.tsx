import type { NextPage } from "next";
import { useAuth } from "../context/auth";
import MainLayout from "../layouts/MainLayout";

const Home: NextPage = () => {
  const { user } = useAuth();
  return (
    <MainLayout title={"Home"}>
      <h1>Hello world!</h1>
    </MainLayout>
  );
};

export default Home;
