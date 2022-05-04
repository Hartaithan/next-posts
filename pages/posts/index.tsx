import { Grid } from "@mantine/core";
import { NextPage } from "next";
import React from "react";
import PostItem from "../../components/PostItem";
import MainLayout from "../../layouts/MainLayout";

const posts = [
  {
    id: 1,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    title: "Title 1",
    description: "Description 1",
    author: "Author 1",
  },
  {
    id: 2,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    title: "Title 2",
    description: "Description 2",
    author: "Author 2",
  },
  {
    id: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    title: "Title 3",
    description: "Description 3",
    author: "Author 3",
  },
];

const Posts: NextPage = () => {
  return (
    <MainLayout>
      <Grid>
        {posts.map((item) => (
          <Grid.Col key={item.id} xs={12} lg={4}>
            <PostItem post={item} />
          </Grid.Col>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Posts;
