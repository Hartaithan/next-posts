import type { NextPage } from "next";
import { useAuth } from "../context/auth";
import MainLayout from "../layouts/MainLayout";

const Home: NextPage = () => {
  const { user } = useAuth();
  return (
    <MainLayout>
      <h1>Hello world!</h1>
      <div>{JSON.stringify(user)}</div>
    </MainLayout>
  );
};

export default Home;
