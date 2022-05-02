import { NextPage } from "next";
import React from "react";
import MainLayout from "../../layouts/MainLayout";

const Posts: NextPage = () => {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold underline">Posts</h1>
    </MainLayout>
  );
};

export default Posts;
