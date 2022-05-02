import { NextPage } from "next";
import React from "react";
import MainLayout from "../../layouts/MainLayout";

const PostAdd: NextPage = () => {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold underline">Add post</h1>
    </MainLayout>
  );
};

export default PostAdd;
