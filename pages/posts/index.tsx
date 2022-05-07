import { Grid } from "@mantine/core";
import { InferGetServerSidePropsType, NextPage } from "next";
import React from "react";
import PostItem from "../../components/PostItem";
import MainLayout from "../../layouts/MainLayout";
import { GetServerSideProps } from "next";
import { IPostItem, IPostsResponse } from "../../models/PostModel";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  const { posts }: IPostsResponse = await res.json();
  return {
    props: { posts },
  };
};

const Posts: NextPage = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <MainLayout title={"All posts"}>
      <Grid>
        {posts.map((item: IPostItem) => (
          <Grid.Col key={item.id} xs={12} lg={4}>
            <PostItem post={item} />
          </Grid.Col>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Posts;
