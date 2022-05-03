import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../layouts/MainLayout";

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MainLayout>
      <h1>Post + {id}</h1>
    </MainLayout>
  );
};

export default Post;
